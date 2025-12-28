import express, { raw } from "express";
import { fetchProducts } from "../services/fakestore.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //call fetchProducts to proxy fakestoreapi.com
        const rawProducts = await fetchProducts();

        //reshape response
        const products = rawProducts.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            image: p.image,
            category: p.category
        }));

        res.json(products);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load products" });
    }
});

export default router