// File: pages/api/addBillingInfo.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '@/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, address, phoneNumber } = req.body

        try {
            await pool.query('INSERT INTO P_BillingInfo (name, address, phoneNumber) VALUES (?, ?, ?)', [name, address, phoneNumber])
            res.status(200).json({ message: 'Billing info added successfully' })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error adding billing info', error: error.message });
            } else {
                res.status(500).json({ message: 'Error adding billing info' });
            }
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}