import '@/src/app/globals.css';
import React, { useState } from 'react';

const AddProductPage: React.FC = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (image) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const product = {
                    name,
                    price,
                    image: reader.result as string,
                };

                const response = await fetch('/api/addProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (response.ok) {
                    console.log('Product added successfully');
                } else {
                    console.error('Error: Failed to add product');
                }
            };
            reader.readAsDataURL(image);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 bg-gray-50 p-7">
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="name">
                    Name:
                </label>
                <input className="border py-2 px-3 text-grey-darkest" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="price">
                    Price:
                </label>
                <input className="border py-2 px-3 text-grey-darkest" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-grey-darkest" htmlFor="image">
                    Image:
                </label>
                <input className="border py-2 px-3 text-grey-darkest" type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} required />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
            </button>
        </form>
        </div>
    );
};

export default AddProductPage;