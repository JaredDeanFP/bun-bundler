import {fetchPricing} from "./fetchPricing.ts" with {type:'macro'};

type Product = {
    id: string;
    amount: number;
}
export async function calcProduct(product: Product) {
    const pricing = await fetchPricing();

    return pricing.reduce<number>((previousValue, currentValue) => {
        let newVal = previousValue;
        if (currentValue.id === product.id) {
            newVal += product.amount * currentValue.pricing * currentValue.mod;
        }
        return newVal
    }, 0)
}