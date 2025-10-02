'use client';
import Link from 'next/link';
import AdminGate from '@/components/AdminGate';

export default function AdminHome() {
  return (
    <div className="container mx-auto px-4 py-8"> 
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <AdminGate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          <Link href="/admin/sneakers" className="block bg-white p-6 rounded shadow hover:shadow-md">
            <h2 className="text-xl font-semibold">Manage Sneakers</h2>
            <p className="text-gray-600">Add, edit, remove, and export sneakers</p>
          </Link>
          <Link href="/admin/outfits" className="block bg-white p-6 rounded shadow hover:shadow-md"> 
            <h2 className="text-xl font-semibold">Manage Outfits</h2>
            <p className="text-gray-600">Add, edit, remove, and export outfits</p>
          </Link>
          <Link href="/admin/content" className="block bg-white p-6 rounded shadow hover:shadow-md">
            <h2 className="text-xl font-semibold">Hero & Designs</h2>
            <p className="text-gray-600">Manage hero slides and text/SVG designs</p>
          </Link>
          <Link href="/admin/orders" className="block bg-white p-6 rounded shadow hover:shadow-md">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-gray-600">Review and update customer orders</p>
          </Link>
        </div>
      </AdminGate>
    </div>
  );
}
