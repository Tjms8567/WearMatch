'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  type: 'sneaker' | 'outfit';
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedDesignId?: string;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  createdAt: string; // ISO string
  customer: CustomerInfo;
  notes?: string;
}

interface OrdersContextType {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => Order;
  updateStatus: (orderId: string, status: OrderStatus) => void;
  clearAll: () => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('wearmatch_orders');
    if (raw) setOrders(JSON.parse(raw) as Order[]);
  }, []);

  const persist = (next: Order[]) => {
    setOrders(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wearmatch_orders', JSON.stringify(next));
    }
  };

  const createOrder: OrdersContextType['createOrder'] = (input) => {
    const id = `ord_${Date.now()}`;
    const order: Order = {
      id,
      ...input,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    const next = [order, ...orders];
    persist(next);
    return order;
  };

  const updateStatus: OrdersContextType['updateStatus'] = (orderId, status) => {
    const next = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    persist(next);
  };

  const clearAll = () => persist([]);

  const value = useMemo(
    () => ({ orders, createOrder, updateStatus, clearAll }),
    [orders]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}
