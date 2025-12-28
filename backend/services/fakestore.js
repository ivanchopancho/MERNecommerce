import fetch from "node-fetch"

export async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products", {
        headers: {
            "User-Agent": "Mernecommerce/1.0 (learning project)",
            "Accept": "application/json"
        }
    });
    if (!res.ok) {
        throw new Error(`FakeStore failed: ${res.status}`);
    }
    return res.json();
}