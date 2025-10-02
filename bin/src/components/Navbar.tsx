"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalCount } = useCart();
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-dark">WearMatch</Link>
        <div className="flex items-center gap-6">
          <Link href="/sneakers" className="text-gray-700 hover:text-black">Sneakers</Link>
          <Link href="/outfits" className="text-gray-700 hover:text-black">Outfits</Link>
          <Link href="/brands" className="text-gray-700 hover:text-black">Brands</Link>
          <Link href="/admin" className="text-gray-700 hover:text-black">Admin</Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-black">
            Cart
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-xs w-6 h-6">
              {totalCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
