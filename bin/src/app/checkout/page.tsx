'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { items, totalPrice, clear } = useCart();

  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
    clear();
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
        <div className="max-w-xl bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Order Total</h2>
          <p className="text-2xl font-bold mb-6">${'{'}totalPrice.toFixed(2){'}'}</p>
          <button onClick={handlePlaceOrder} className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Place Order</button>
        </div>
      )}
    </div>
  );
}
