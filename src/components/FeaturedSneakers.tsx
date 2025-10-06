'use client';
import { useSneakerContext } from '@/context/SneakerContext';
import SneakerCard from './SneakerCard';

export default function FeaturedSneakers() {
  const { sneakers } = useSneakerContext();
  
  // Get 4 featured sneakers
  const featuredSneakers = sneakers.slice(0, 4);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredSneakers.map(sneaker => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}