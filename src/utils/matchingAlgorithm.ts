// Utility functions for matching sneakers with outfits
import { Sneaker, Outfit } from '@/context/SneakerContext';

interface OutfitWithScore extends Outfit {
  matchScore: number;
}

// Color compatibility scoring
const calculateColorScore = (sneakerColors: any, outfitColors: any): number => {
  let score = 0;
  
  // Helper function to normalize colors for comparison
  const normalizeColor = (color: string): string => {
    if (!color) return '';
    // Convert hex to lowercase for comparison
    if (color.startsWith('#')) {
      return color.toLowerCase();
    }
    // Convert color names to hex equivalents for better matching
    const colorMap: { [key: string]: string } = {
      'black': '#000000',
      'white': '#ffffff',
      'red': '#ff0000',
      'blue': '#0000ff',
      'green': '#008000',
      'yellow': '#ffff00',
      'orange': '#ffa500',
      'purple': '#800080',
      'pink': '#ffc0cb',
      'brown': '#a52a2a',
      'gray': '#808080',
      'grey': '#808080',
      'navy': '#000080',
      'gold': '#ffd700',
      'silver': '#c0c0c0'
    };
    return colorMap[color.toLowerCase()] || color.toLowerCase();
  };
  
  const sneakerPrimary = normalizeColor(sneakerColors.primary);
  const sneakerSecondary = normalizeColor(sneakerColors.secondary);
  const sneakerAccent = normalizeColor(sneakerColors.accent);
  
  const outfitPrimary = normalizeColor(outfitColors.primary);
  const outfitSecondary = normalizeColor(outfitColors.secondary);
  const outfitAccent = normalizeColor(outfitColors.accent);
  
  // Primary color match
  if (sneakerPrimary === outfitPrimary) {
    score += 3;
  }
  
  // Secondary color match
  if (sneakerSecondary === outfitSecondary) {
    score += 2;
  }
  
  // Accent color match
  if (sneakerAccent === outfitAccent) {
    score += 1;
  }
  
  // Cross-color matches (e.g., sneaker primary matches outfit secondary)
  if (sneakerPrimary === outfitSecondary || sneakerPrimary === outfitAccent) {
    score += 1;
  }
  if (sneakerSecondary === outfitPrimary || sneakerSecondary === outfitAccent) {
    score += 1;
  }
  
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

// Find matching sneakers for an outfit (reverse matching)
export const findMatchingSneakers = (outfit: Outfit, sneakers: Sneaker[]): Sneaker[] => {
  // Calculate match scores for each sneaker
  const scoredSneakers = sneakers.map(sneaker => {
    const score = calculateMatchScore(sneaker, outfit);
    
    // Only include sneakers with a minimum score
    if (score >= 2) {
      return {
        ...sneaker,
        matchScore: score
      };
    }
    return null;
  }).filter((sneaker): sneaker is Sneaker & { matchScore: number } => sneaker !== null);
  
  // Sort by match score (highest first)
  return scoredSneakers.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

// Filter matches by category
export const filterMatchesByCategory = (matches: Outfit[], category: string): Outfit[] => {
  if (!category || category === 'all') {
    return matches;
  }
  
  return matches.filter(outfit => outfit.styles.includes(category));
};