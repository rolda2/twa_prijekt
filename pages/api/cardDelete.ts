// File: pages/api/cardDelete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db'; // Adjust the path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { id } = req.query;

        try {
            const result = await pool.query('DELETE FROM P_cards WHERE id = ?', [id]);

            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Card not found.' });
            } else {
                res.status(200).json({ message: 'Card deleted successfully.' });
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'An error occurred' });
            }
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}