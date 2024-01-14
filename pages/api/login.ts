// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password } = req.body;

    const [users] = await pool.execute('SELECT * FROM P_users WHERE username = ?', [username]);
    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');

    res.json({ token });
};