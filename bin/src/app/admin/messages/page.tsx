'use client';
import AdminGate from '@/components/AdminGate';
import { useMessages } from '@/context/MessagesContext';

export default function AdminMessagesPage() {
  const { messages, removeMessage, clearAll } = useMessages();
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminGate>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Messages ({messages.length})</h1>
          {messages.length > 0 && (
            <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200" onClick={clearAll}>Clear All</button>
          )}
        </div>
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{m.subject}</div>
                  <div className="text-sm text-gray-600">From {m.name} &lt;{m.email}&gt;</div>
                </div>
                <button className="text-red-600 hover:underline" onClick={() => removeMessage(m.id)}>Delete</button>
              </div>
              <p className="mt-2 text-gray-800 whitespace-pre-wrap">{m.body}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-gray-600">No messages yet.</p>}
        </div>
      </AdminGate>
    </div>
  );
}
