// File: pages/api/updateProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, name, price, isSelected } = req.body; // Extract values from request body

    try {
        const result = await pool.query(
            'UPDATE P_cards SET name = ?, price = ?, isSelected = ? WHERE id = ?',
            [name, price, isSelected, id] // Use these values in your SQL command
        );

        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Product not found.' });
        } else {
            res.status(200).json({ message: 'Product updated successfully.' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
}