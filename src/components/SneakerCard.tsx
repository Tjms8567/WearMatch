'use client';
import Link from 'next/link';
import { Sneaker } from '@/context/SneakerContext';

export interface SneakerCardProps {
  sneaker: Sneaker;
}

export default function SneakerCard({ sneaker }: SneakerCardProps) {
  return (
    <Link href={`/sneakers/${sneaker.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img 
            src={sneaker.image} 
            alt={`${sneaker.brand} ${sneaker.model}`} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{sneaker.brand} {sneaker.model}</h3>
          <p className="text-gray-600 mb-2">{sneaker.colorway}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold">${sneaker.price}</span>
            <span className="text-sm text-gray-500">{sneaker.releaseYear}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}