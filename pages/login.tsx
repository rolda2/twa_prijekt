// pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import '@/src/app/globals.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const { token } = await response.json();
            // Save the token and redirect the user to the admin page
            localStorage.setItem('token', token);
            router.push('/admin');
        } else {
            // Handle the error
            const { message } = await response.json();
            alert(message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen flex-col bg-gray-200">
            <form className="p-6 bg-white rounded shadow-md" onSubmit={handleSubmit}>
                <input className="w-full p-2 mb-3 border rounded" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input className="w-full p-2 mb-3 border rounded" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-700" type="submit">Login</button>
            </form>
            <Link href="/register" className='mt-3 text-blue-500 hover:underline'>Go to register</Link>
        </div>
    );
};

export default Login;