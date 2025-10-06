'use client';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import sneakersData from '@/data/sneakers.json';
import outfitsData from '@/data/outfits.json';
import { findMatchingOutfits } from '@/utils/matchingAlgorithm';

// Define types
export interface Color {
  primary: string;
  secondary: string;
  accent: string;
}

export interface Sneaker {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  price: number;
  releaseYear: number;
  image: string;
  colors: Color;
  styles: string[];
  description: string;
}

export interface OutfitItem {
  type: string;
  name: string;
  color: string;
}

export interface Outfit {
  id: string;
  name: string;
  image: string;
  price?: number;
  colors: Color;
  styles: string[];
  items?: OutfitItem[];
  sizes?: string[];
  description: string;
}

interface SneakerContextType {
  sneakers: Sneaker[];
  outfits: Outfit[];
  filteredSneakers: Sneaker[];
  filteredOutfits: Outfit[];
  selectedSneaker: Sneaker | null;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  setSelectedSneaker: (sneaker: Sneaker | null) => void;
  getMatchingOutfits: (sneakerId: string) => Outfit[];
  filterSneakersByBrand: (brand: string) => void;
  getAllBrands: () => string[];
  // Admin CRUD APIs
  addSneaker: (s: Sneaker) => void;
  updateSneaker: (id: string, update: Partial<Sneaker>) => void;
  removeSneaker: (id: string) => void;
  addOutfit: (o: Outfit) => void;
  updateOutfit: (id: string, update: Partial<Outfit>) => void;
  removeOutfit: (id: string) => void;
  exportData: () => { sneakers: Sneaker[]; outfits: Outfit[] };
}

// Create context
const SneakerContext = createContext<SneakerContextType | undefined>(undefined);

// Provider component
export function SneakerProvider({ children }: { children: ReactNode }) {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [filteredSneakers, setFilteredSneakers] = useState<Sneaker[]>([]);
  const [filteredOutfits, setFilteredOutfits] = useState<Outfit[]>([]);
  const [selectedSneaker, setSelectedSneaker] = useState<Sneaker | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  // Initialize data with localStorage override if available
  useEffect(() => {
    try {
      const storedSneakers = typeof window !== 'undefined' ? localStorage.getItem('wearmatch_sneakers') : null;
      const storedOutfits = typeof window !== 'undefined' ? localStorage.getItem('wearmatch_outfits') : null;

      const initialSneakers = storedSneakers ? (JSON.parse(storedSneakers) as Sneaker[]) : (sneakersData as Sneaker[]);
      const initialOutfits = storedOutfits ? (JSON.parse(storedOutfits) as Outfit[]) : (outfitsData as Outfit[]);

      setSneakers(initialSneakers);
      setOutfits(initialOutfits);
      setFilteredSneakers(initialSneakers);
      setFilteredOutfits(initialOutfits);
    } catch (_e) {
      setSneakers(sneakersData as Sneaker[]);
      setOutfits(outfitsData as Outfit[]);
      setFilteredSneakers(sneakersData as Sneaker[]);
      setFilteredOutfits(outfitsData as Outfit[]);
    }
  }, []);

  const persistSneakers = (next: Sneaker[]) => {
    setSneakers(next);
    setFilteredSneakers((prev) => {
      if (!selectedBrand) return next;
      return next.filter(s => s.brand === selectedBrand);
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('wearmatch_sneakers', JSON.stringify(next));
    }
  };

  const persistOutfits = (next: Outfit[]) => {
    setOutfits(next);
    setFilteredOutfits(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('wearmatch_outfits', JSON.stringify(next));
    }
  };

  // Get all unique brands
  const getAllBrands = (): string[] => {
    const brands = sneakers.map(sneaker => sneaker.brand);
    return [...new Set(brands)];
  };

  // Filter sneakers by brand
  const filterSneakersByBrand = (brand: string) => {
    if (brand === '') {
      setFilteredSneakers(sneakers);
    } else {
      const filtered = sneakers.filter(sneaker => sneaker.brand === brand);
      setFilteredSneakers(filtered);
    }
    setSelectedBrand(brand);
  };

  // Get matching outfits for a sneaker
  const getMatchingOutfits = (sneakerId: string): Outfit[] => {
    const sneaker = sneakers.find(s => s.id === sneakerId);
    if (!sneaker) return [];
    
    return findMatchingOutfits(sneaker, outfits);
  };

  const value = {
    sneakers,
    outfits,
    filteredSneakers,
    filteredOutfits,
    selectedSneaker,
    selectedBrand,
    setSelectedBrand,
    setSelectedSneaker,
    getMatchingOutfits,
    filterSneakersByBrand,
    getAllBrands,
    // Admin
    addSneaker: (s: Sneaker) => {
      const next = [...sneakers, s];
      persistSneakers(next);
    },
    updateSneaker: (id: string, update: Partial<Sneaker>) => {
      const next = sneakers.map(s => (s.id === id ? { ...s, ...update } : s));
      persistSneakers(next);
    },
    removeSneaker: (id: string) => {
      const next = sneakers.filter(s => s.id !== id);
      persistSneakers(next);
    },
    addOutfit: (o: Outfit) => {
      const next = [...outfits, o];
      persistOutfits(next);
    },
    updateOutfit: (id: string, update: Partial<Outfit>) => {
      const next = outfits.map(o => (o.id === id ? { ...o, ...update } : o));
      persistOutfits(next);
    },
    removeOutfit: (id: string) => {
      const next = outfits.filter(o => o.id !== id);
      persistOutfits(next);
    },
    exportData: () => ({ sneakers, outfits })
  };

  return (
    <SneakerContext.Provider value={value}>
      {children}
    </SneakerContext.Provider>
  );
}

// Custom hook to use the context
export function useSneakerContext() {
  const context = useContext(SneakerContext);
  if (context === undefined) {
    throw new Error('useSneakerContext must be used within a SneakerProvider');
  }
  return context;
}