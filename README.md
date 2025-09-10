# bun-bundler
Minimal Reproduction of Bundlr crash. I know this is terrible code, it vaguely resembles the code that caused the error.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

# Reproduce
1. Install dependencies
2. Run api (`bun dev`)
3. Hit api endpoint `localhost:3000/calc`
4. Let it chug
5. Crash

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
