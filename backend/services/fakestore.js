export async function fetchProducts() {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
        throw new Error(`FakeStore failed: ${res.status}`);
    }
    return res.json();
}