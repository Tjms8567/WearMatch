'use client';
import AdminGate from '@/components/AdminGate';
import { useOrders } from '@/context/OrdersContext';
import { useMemo, useState } from 'react';

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrders();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchesQ = q ? (
        o.id.includes(q) ||
        o.customer.name.toLowerCase().includes(q.toLowerCase()) ||
        o.customer.email.toLowerCase().includes(q.toLowerCase())
      ) : true;
      const matchesStatus = status === 'all' ? true : o.status === status;
      return matchesQ && matchesStatus;
    });
  }, [orders, q, status]);

  const exportCsv = () => {
    const headers = ['id','createdAt','status','name','email','total'];
    const rows = filtered.map(o => [o.id, o.createdAt, o.status, o.customer.name, o.customer.email, o.total]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'orders.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Orders ({filtered.length}/{orders.length})</h1>
          <div className="flex items-center gap-2">
            <input className="border rounded px-3 py-2" placeholder="Search id/name/email" value={q} onChange={(e)=>setQ(e.target.value)} />
            <select className="border rounded px-2 py-2" value={status} onChange={(e)=>setStatus(e.target.value)}>
              {['all','pending','paid','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={exportCsv} className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">Export CSV</button>
          </div>
        </div>
        <div className="space-y-4">
          {filtered.map((o) => (
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
                  {o.history && o.history.length > 0 && (
                    <div className="mt-2 text-xs text-gray-600">
                      <div className="font-medium mb-1">Timeline</div>
                      <ul className="list-disc pl-5 space-y-0.5">
                        {o.history.map((h, idx) => (
                          <li key={idx}>{h.status} · {new Date(h.at).toLocaleString()}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-gray-600">No orders match your filters.</p>}
        </div>
      </AdminGate>
    </div>
  );
}
