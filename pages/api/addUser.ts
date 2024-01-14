// pages/api/addUser.tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import pool from '@/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username } = req.body;

        // Generate a random password
        const password = Math.random().toString(36).slice(-8);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Add the new user to the database
        try {
            await pool.execute('INSERT INTO P_users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            res.status(200).json({ message: 'User added successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding user' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}