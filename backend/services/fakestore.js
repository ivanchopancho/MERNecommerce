import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function fetchProducts() {
    const filePath = path.join(__dirname, "../data/products.json");
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
};

