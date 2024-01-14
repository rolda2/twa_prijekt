// File: fetchProducts.ts

import { Pool } from 'mysql2/promise';
import pool from '../../db'; // replace './db' with the actual path to your db.js file

interface Product {
    id: number;
    image: Buffer | null;
    name: string;
    price: number;
    isSelected: boolean;
}

async function fetchProducts(): Promise<Product[]> {
    const query = 'SELECT * FROM P_cards'; // replace 'products' with your table name

    const [results] = await pool.execute(query);

    // Convert image data to base64
    const productsWithImages: Product[] = (results as any[]).map((product) => ({
        ...product,
        image: product.image ? 'data:image/jpeg;base64,' + Buffer.from(product.image).toString('base64') : null,
    }));

    return productsWithImages;
}

export default fetchProducts;