'use client';
import React from 'react';

export default function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Size Guide</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-black">✕</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Use this general guide to find your perfect fit.</p>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2">Size</th>
                <th className="text-left px-3 py-2">Chest (in)</th>
                <th className="text-left px-3 py-2">Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { s: 'XS', c: '32-34', w: '26-28' },
                { s: 'S', c: '35-37', w: '29-31' },
                { s: 'M', c: '38-40', w: '32-34' },
                { s: 'L', c: '41-43', w: '35-37' },
                { s: 'XL', c: '44-46', w: '38-40' },
                { s: 'XXL', c: '47-49', w: '41-43' },
              ].map(r => (
                <tr key={r.s} className="border-t">
                  <td className="px-3 py-2 font-medium">{r.s}</td>
                  <td className="px-3 py-2">{r.c}</td>
                  <td className="px-3 py-2">{r.w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
