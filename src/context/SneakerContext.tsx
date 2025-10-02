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
  colors: Color;
  styles: string[];
  items?: OutfitItem[];
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

  // Initialize data
  useEffect(() => {
    setSneakers(sneakersData as Sneaker[]);
    setOutfits(outfitsData as Outfit[]);
    setFilteredSneakers(sneakersData as Sneaker[]);
    setFilteredOutfits(outfitsData as Outfit[]);
  }, []);

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
    getAllBrands
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