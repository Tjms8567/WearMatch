'use client';
import AdminGate from '@/components/AdminGate';
import { useOrders } from '@/context/OrdersContext';
import { useMemo } from 'react';

export default function AdminCustomersPage() {
  const { orders } = useOrders();

  const customers = useMemo(() => {
    const map = new Map<string, { email: string; name: string; total: number; orders: number; lastOrderAt?: string }>();
    for (const o of orders) {
      const key = o.customer.email.toLowerCase();
      const entry = map.get(key) || { email: key, name: o.customer.name, total: 0, orders: 0, lastOrderAt: undefined };
      entry.total += o.total;
      entry.orders += 1;
      if (!entry.lastOrderAt || new Date(o.createdAt) > new Date(entry.lastOrderAt)) entry.lastOrderAt = o.createdAt;
      map.set(key, entry);
    }
    return Array.from(map.values()).sort((a,b)=> (new Date(b.lastOrderAt||0).getTime()) - (new Date(a.lastOrderAt||0).getTime()));
  }, [orders]);

  const exportCsv = () => {
    const headers = ['email','name','orders','ltv','lastOrderAt'];
    const rows = customers.map(c => [c.email, c.name, String(c.orders), String(c.total), c.lastOrderAt || '']);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'customers.csv'; a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Customers ({customers.length})</h1>
          <button onClick={exportCsv} className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">Export CSV</button>
        </div>
        <div className="bg-white rounded shadow overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2">Email</th>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Orders</th>
                <th className="text-left px-4 py-2">LTV</th>
                <th className="text-left px-4 py-2">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-t">
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.orders}</td>
                  <td className="px-4 py-2">${c.total.toFixed(2)}</td>
                  <td className="px-4 py-2">{c.lastOrderAt ? new Date(c.lastOrderAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td className="px-4 py-4 text-gray-600" colSpan={5}>No customers yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminGate>
    </div>
  );
}
