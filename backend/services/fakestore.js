import products from "../data/products.json" assert { type: "json" };

export async function fetchProducts() {
    return products;
}


