'use client';
import AdminGate from '@/components/AdminGate';
import { useOrders } from '@/context/OrdersContext';

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrders();
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <h1 className="text-2xl font-bold mb-4">Orders ({orders.length})</h1>
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Order {o.id}</div>
                  <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <select className="border rounded px-2 py-1" value={o.status} onChange={(e)=>updateStatus(o.id, e.target.value as any)}>
                  {['pending','paid','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="font-medium mb-1">Customer</div>
                  <div className="text-sm">{o.customer.name}</div>
                  <div className="text-sm text-gray-600">{o.customer.email}</div>
                  {o.customer.phone && <div className="text-sm text-gray-600">{o.customer.phone}</div>}
                  <div className="text-sm text-gray-600">{o.customer.address}, {o.customer.city} {o.customer.postalCode}</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Items</div>
                  <div className="space-y-1 max-h-40 overflow-auto">
                    {o.items.map(i => (
                      <div key={i.id} className="flex items-center gap-2 text-sm">
                        <img src={i.image} className="w-8 h-8 rounded object-cover" />
                        <div className="flex-1">{i.name} x{i.quantity}</div>
                        <div>${(i.price * i.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <p className="text-gray-600">No orders yet.</p>}
        </div>
      </AdminGate>
    </div>
  );
}
