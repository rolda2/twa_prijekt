// File: components/Card.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id: string;
  image: string | null;
  name: string;
  price: number;
  onUpdate: (id: string, name: string, price: number, isVisible: boolean) => void;
  isEditable: boolean;
  onDelete: (id: string) => void; // Add this line
}

const Card: React.FC<CardProps> = ({ id, image, name, price, onUpdate, isEditable, onDelete }) => {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);

  const handleUpdate = () => {
    onUpdate(id, newName, newPrice, isEditable);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg w-80 h-96 m-4 flex flex-col">
      <div className="w-full h-72 relative">
        {image && (
          <Image 
            src={image}
            alt={name} 
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <div className="px-6 py-4 flex justify-center items-center bg-white">
        {isEditable ? (
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
        ) : (
          <p>{name}</p>
        )}
      </div>
      <div className="px-6 py-4 flex justify-center items-center bg-white">
        {isEditable ? (
          <input type="number" value={newPrice} onChange={e => setNewPrice(Number(e.target.value))} />
        ) : (
          <p>{price}</p>
        )}
      </div>
      {isEditable && (
        <div className="px-6 py-4 flex justify-center items-center bg-white">
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
      {isEditable && (
      <div className="px-6 py-4 flex justify-center items-center bg-white">
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
      )}
      <div className="px-6 py-4 flex justify-center items-center bg-white">
        <Link href={`/billingInfo?productId=${id}`}>Buy</Link>
      </div>
    </div>
  );
};

export default Card;