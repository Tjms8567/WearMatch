'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  createdAt: string;
}

interface MessagesContextType {
  messages: Message[];
  addMessage: (m: Omit<Message, 'id' | 'createdAt'>) => Message;
  removeMessage: (id: string) => void;
  clearAll: () => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem('wearmatch_messages');
    if (raw) setMessages(JSON.parse(raw) as Message[]);
  }, []);

  const persist = (next: Message[]) => {
    setMessages(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_messages', JSON.stringify(next));
  };

  const addMessage: MessagesContextType['addMessage'] = (input) => {
    const msg: Message = {
      id: `msg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...input,
    };
    const next = [msg, ...messages];
    persist(next);
    return msg;
  };

  const removeMessage = (id: string) => persist(messages.filter(m => m.id !== id));
  const clearAll = () => persist([]);

  const value = useMemo(() => ({ messages, addMessage, removeMessage, clearAll }), [messages]);

  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>;
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
}
