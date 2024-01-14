// pages/api/billingInfo.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM P_BillingInfo');
            console.log('SQL query result:', result);
            res.status(200).json(result[0]);
        } catch (error) {
            console.error('Error executing SQL query:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error fetching billing info', error: error.message });
            } else {
                res.status(500).json({ message: 'Error fetching billing info' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}