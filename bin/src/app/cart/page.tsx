'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, totalCount, totalPrice, removeItem, updateQuantity, clear } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link href="/sneakers" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 capitalize text-sm">{item.type}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="font-semibold">${'{'}item.price{'}'}</span>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Qty</label>
                      <input
                        type="number"
                        min={1}
                        className="w-16 border rounded px-2 py-1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items</span>
                <span>{totalCount}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-bold">${'{'}totalPrice.toFixed(2){'}'}</span>
              </div>
              <div className="space-y-2">
                <Link href="/checkout" className="block text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Checkout</Link>
                <button className="w-full text-center bg-gray-100 px-4 py-2 rounded hover:bg-gray-200" onClick={clear}>Clear Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
