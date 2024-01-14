// File: pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetchProducts from './fetchProducts';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const products = await fetchProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching products' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}