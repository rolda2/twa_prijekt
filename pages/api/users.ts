// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [rows, fields] = await pool.execute('SELECT * FROM users');

  res.json(rows);
};