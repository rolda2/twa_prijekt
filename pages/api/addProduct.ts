import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db';

export interface Product {
    image: string | null; // change the type to string
    name: string;
    price: number;
}

export default async function addProduct(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const product: Omit<Product, 'id'> = req.body;

        // Decode the base64 image
        const imageBuffer = product.image ? Buffer.from(product.image, 'base64') : null;

        const [result] = await pool.execute(
            'INSERT INTO P_cards (image, name, price) VALUES (?, ?, ?)',
            [imageBuffer, product.name, product.price]
        );

        if (result.affectedRows > 0) {
            res.status(200).json(product);
        } else {
            res.status(500).json({ error: 'Failed to add product' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}