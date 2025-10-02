'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();
  const { createOrder } = useOrders();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', postalCode: '', country: '', notes: ''
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    if (!form.name || !form.email || !form.address || !form.city || !form.postalCode) {
      alert('Please fill in required fields');
      return;
    }
    const order = createOrder({
      items: items.map(i => ({
        id: i.id,
        type: i.type,
        name: i.name,
        image: i.image,
        price: i.price,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
        selectedDesignId: i.selectedDesignId,
      })),
      subtotal: totalPrice,
      total: totalPrice,
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      notes: form.notes,
    });
    clear();
    alert(`Order ${order.id} placed!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      {items.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link href="/sneakers" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handlePlaceOrder} className="lg:col-span-2 bg-white p-6 rounded shadow space-y-3">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Full name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
              <input className="border rounded px-3 py-2" type="email" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
              <input className="border rounded px-3 py-2" placeholder="Phone (optional)" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Country" value={form.country} onChange={(e)=>setForm({...form,country:e.target.value})} />
              <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Street address" value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} required />
              <input className="border rounded px-3 py-2" placeholder="City" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})} required />
              <input className="border rounded px-3 py-2" placeholder="Postal code" value={form.postalCode} onChange={(e)=>setForm({...form,postalCode:e.target.value})} required />
            </div>
            <textarea className="border rounded px-3 py-2 w-full" rows={3} placeholder="Order notes (optional)" value={form.notes} onChange={(e)=>setForm({...form,notes:e.target.value})} />
            <button type="submit" className="w-full md:w-auto bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Place Order</button>
          </form>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4 max-h-64 overflow-auto">
              {items.map((i)=> (
                <div key={i.id} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{i.name}</div>
                    <div className="text-xs text-gray-600">x{i.quantity} · ${'{'}i.price{'}'}</div>
                  </div>
                  <div className="text-sm font-semibold">${'{'}(i.price * i.quantity).toFixed(2){'}'}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-bold">${'{'}totalPrice.toFixed(2){'}'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
