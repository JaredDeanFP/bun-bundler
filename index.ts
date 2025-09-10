import {createRoute, OpenAPIHono, z} from "@hono/zod-openapi";
import {Scalar} from "@scalar/hono-api-reference";
import { runMigrations } from "./src/db/index";
import { seedDatabase } from "./src/db/seed";


const app = new OpenAPIHono({});

app.onError((err, c) => {
    return c.text(err.message, 400)
});

const bundlerRoute = new OpenAPIHono().openapi(createRoute({
    method: 'get',
    path: '/',
    description: 'Fetch API',
    responses: {
        200: {
            description: 'Successfully Generate Bundle',
            content: {
                'text/javascript': {
                    schema: z.string(),
                },
            },
        },
    },

}), async (c) => {
    const result = await Bun.build({
        entrypoints: ['calcProduct.ts'],
        target: 'browser',
        compile: false,
        format: 'esm',
        minify: {
            identifiers: false,
            syntax: true,
            whitespace: false,
        },
    });

    let bundle: string | undefined;
    for (const res of result.outputs) {
        bundle = await res.text();
    }

    if (!bundle) {
        throw new Error('Invalid')
    }

    return c.newResponse(bundle, 200, {
        'Content-Type': 'text/javascript',
    });
});

app.route('/calc', bundlerRoute);


app.doc('/doc', {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'Bundler API',
    },
    // Set Security Globally
    security: [
        {
            Bearer: [],
        },
    ],
});

app.get(
    '/openapi',

    Scalar({
        pageTitle: 'Reckoner API Documentation',
        theme: 'solarized',
        url: '/doc',
    }),
);

async function initializeDatabase() {
  console.log("Initializing database...");
  await runMigrations();
  await seedDatabase();
  console.log("Database initialization completed");
}

initializeDatabase().catch(console.error);

export default {
    fetch: app.fetch,
    idleTimeout: 0
}