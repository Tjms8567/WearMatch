// Utility functions for matching sneakers with outfits
import { Sneaker, Outfit } from '@/context/SneakerContext';

interface OutfitWithScore extends Outfit {
  matchScore: number;
}

// Normalize color values across hex codes and basic color names
function normalizeColorName(colorValue: string): string {
  if (!colorValue) return 'unknown';
  const value = colorValue.trim().toLowerCase();

  const directMap: Record<string, string> = {
    // Names -> canonical
    black: 'black',
    white: 'white',
    gray: 'gray',
    grey: 'gray',
    red: 'red',
    blue: 'blue',
    navy: 'blue',
    orange: 'orange',
    yellow: 'yellow',
    gold: 'yellow',
    brown: 'brown',
  };

  if (!value.startsWith('#') && directMap[value]) {
    return directMap[value];
  }

  // Known hex -> canonical buckets (covers our dataset)
  const knownHexMap: Record<string, string> = {
    '#000000': 'black',
    '#ffffff': 'white',
    '#808080': 'gray',
    '#ff0000': 'red',
    '#ce1141': 'red', // Chicago/Bulls red
    '#000080': 'blue', // navy treated as blue family
    '#0000ff': 'blue',
    '#ffd700': 'yellow', // gold
  };

  if (value.startsWith('#')) {
    const hex = value.length === 4
      ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
      : value;
    const mapped = knownHexMap[hex];
    if (mapped) return mapped;
  }

  return value; // fallback to raw
}

// Color compatibility scoring with normalization and basic buckets
const calculateColorScore = (sneakerColors: any, outfitColors: any): number => {
  let score = 0;

  const sPrimary = normalizeColorName(sneakerColors.primary);
  const sSecondary = normalizeColorName(sneakerColors.secondary);
  const sAccent = normalizeColorName(sneakerColors.accent);

  const oPrimary = normalizeColorName(outfitColors.primary);
  const oSecondary = normalizeColorName(outfitColors.secondary);
  const oAccent = normalizeColorName(outfitColors.accent);

  // Primary color match (highest weight)
  if (sPrimary === oPrimary) {
    score += 3;
  }

  // Secondary color match
  if (sSecondary === oSecondary) {
    score += 2;
  }

  // Accent color match
  if (sAccent === oAccent) {
    score += 1;
  }

  // Partial matches across buckets give small bonus
  const setSneaker = new Set([sPrimary, sSecondary, sAccent]);
  const setOutfit = new Set([oPrimary, oSecondary, oAccent]);
  let overlaps = 0;
  setOutfit.forEach((c) => {
    if (setSneaker.has(c)) overlaps += 1;
  });
  if (overlaps >= 2) score += 1; // small bonus for overall palette harmony

  return score;
};

// Style compatibility scoring
const calculateStyleScore = (sneakerStyles: string[], outfitStyles: string[]): number => {
  let score = 0;
  
  // Count matching styles
  outfitStyles.forEach(style => {
    if (sneakerStyles.includes(style)) {
      score += 2;
    }
  });
  
  return score;
};

// Calculate total match score
const calculateMatchScore = (sneaker: Sneaker, outfit: Outfit): number => {
  const colorScore = calculateColorScore(sneaker.colors, outfit.colors);
  const styleScore = calculateStyleScore(sneaker.styles, outfit.styles);
  
  // Total score is a weighted sum of color and style scores
  return colorScore + styleScore;
};

// Main matching function
export const findMatchingOutfits = (sneaker: Sneaker, outfits: Outfit[]): OutfitWithScore[] => {
  // Calculate match scores for each outfit
  const scoredOutfits = outfits.map(outfit => {
    const score = calculateMatchScore(sneaker, outfit);
    
    // Only include outfits with a minimum score
    if (score >= 2) {
      return {
        ...outfit,
        matchScore: score
      };
    }
    return null;
  }).filter((outfit): outfit is OutfitWithScore => outfit !== null);
  
  // Sort by match score (highest first)
  return scoredOutfits.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

// Filter matches by category
export const filterMatchesByCategory = (matches: Outfit[], category: string): Outfit[] => {
  if (!category || category === 'all') {
    return matches;
  }
  
  return matches.filter(outfit => outfit.styles.includes(category));
};