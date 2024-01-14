// pages/admin.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '@/src/components/Card';
import Navbar from '@/src/components/Navbar'; // Import Navbar
import Carousel from '@/src/components/Carousel'; // Import Carousel
import '@/src/app/globals.css';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const Admin: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [billingInfo, setBillingInfo] = useState([]);
    

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            });

        fetch('/api/billingInfo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (error) {
                    console.error('Could not parse JSON:', text);
                    throw error;
                }
            })
            .then(data => {
                setBillingInfo(data);
            })
            .catch(error => {
                console.error('Error fetching billing info:', error);
            });
    }, []);

    const handleUpdateProduct = (id: string, name: string, price: number, isSelected: boolean) => {
        const numericId = Number(id);
        fetch('/api/updateProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name, price, isSelected }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            // Re-fetch the products to update the UI
            fetch('/api/products')
                .then(response => response.json())
                .then(data => {
                    setProducts(data);
                });
        });
    };

    const handleDeleteProduct = (id: string) => {
        const numericId = Number(id);
        fetch(`/api/cardDelete/${id}`, {
          method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          // Re-fetch the products to update the UI
          fetch('/api/products')
            .then(response => response.json())
            .then(data => {
              setProducts(data);
            });
        });
      };

    return (
        <div>
          <Navbar currentPage='/admin'/>
          <Carousel />
          <div className="flex flex-wrap justify-around pt-20 pb-20">
            {products.map(product => (
            <Card 
                key={product.id} 
                id={product.id.toString()} 
                name={product.name} 
                price={product.price} 
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
                isEditable={true}
                image={product.image}
            />
            ))}
          </div>
          <div className='flex justify-center pb-20'>
            <Link href='/addProduct'>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 flex justify-center">
                Add Product
            </button>
            </Link>
            </div>
        <div>
            <h2 className="text-2xl font-semibold mb-4 text-white justify-center align-center flex">Billing Information</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order no.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {billingInfo.map(({ id, name, address, phoneNumber }) => (
                        <tr key={id}>
                            <td className="px-6 py-4 whitespace-nowrap">{id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{address}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{phoneNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
      );
};

export default Admin;