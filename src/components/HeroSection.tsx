'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Match Your Sneakers with Perfect Outfits</h1>
        <p className="text-xl mb-8 max-w-2xl">Find stylish outfit combinations that perfectly complement your favorite sneakers using our advanced matching algorithm.</p>
        <div className="flex space-x-4">
          <Link href="/sneakers" className="bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition">
            Browse Sneakers
          </Link>
          <Link href="/brands" className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-primary transition">
            Explore Brands
          </Link>
        </div>
      </div>
    </section>
  );
}