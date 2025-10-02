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
  items: OutfitItem[];
  description: string;
  matchScore?: number;
}

export interface SneakerCardProps {
  sneaker: Sneaker;
}