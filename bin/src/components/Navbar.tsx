"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { totalCount } = useCart();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-dark">WearMatch</Link>
        <div className="flex items-center gap-6">
          <Link href="/sneakers" className="text-gray-700 hover:text-black">Sneakers</Link>
          <Link href="/outfits" className="text-gray-700 hover:text-black">Outfits</Link>
          <Link href="/brands" className="text-gray-700 hover:text-black">Brands</Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-black">
            Cart
            <span className="ml-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white text-xs w-6 h-6">
              {totalCount}
            </span>
          </Link>
          {user ? (
            <button onClick={logout} className="text-gray-700 hover:text-black">Logout</button>
          ) : (
            <Link href="/login" className="text-gray-700 hover:text-black">Login</Link>
          )}
          <button
            aria-label="Toggle theme"
            className="p-2 rounded hover:bg-gray-100"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
