'use client';
import Link from 'next/link';
import { Outfit } from '@/context/SneakerContext';

export interface OutfitCardProps {
  outfit: Outfit;
  showMatchScore?: boolean;
}

export default function OutfitCard({ outfit, showMatchScore = false }: OutfitCardProps) {
  return (
    <Link href={`/outfits/${outfit.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 overflow-hidden">
          <img 
            src={outfit.image} 
            alt={outfit.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">{outfit.name}</h3>
            {showMatchScore && outfit.matchScore && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                {outfit.matchScore}/10
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-3 text-sm line-clamp-2">{outfit.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {outfit.styles.map((style, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {style}
              </span>
            ))}
          </div>

          {outfit.items && outfit.items.length > 0 && (
            <div className="text-xs text-gray-500">
              <span className="font-medium">Items:</span> {outfit.items.length} pieces
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}