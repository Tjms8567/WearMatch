'use client';
import Link from 'next/link';
import { Sneaker } from '@/context/SneakerContext';
import { motion } from 'framer-motion';

export interface SneakerCardProps {
  sneaker: Sneaker;
}

export default function SneakerCard({ sneaker }: SneakerCardProps) {
  return (
    <Link href={`/sneakers/${sneaker.id}`}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        <div className="h-48 overflow-hidden">
          <motion.img 
            src={sneaker.image} 
            alt={`${sneaker.brand} ${sneaker.model}`} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
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
      </motion.div>
    </Link>
  );
}