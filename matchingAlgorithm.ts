// Utility functions for matching sneakers with outfits
import { Sneaker, Outfit } from '@/context/SneakerContext';

interface OutfitWithScore extends Outfit {
  matchScore: number;
}

// Color compatibility scoring
const calculateColorScore = (sneakerColors: any, outfitColors: any): number => {
  let score = 0;
  
  // Primary color match
  if (sneakerColors.primary === outfitColors.primary) {
    score += 3;
  }
  
  // Secondary color match
  if (sneakerColors.secondary === outfitColors.secondary) {
    score += 2;
  }
  
  // Accent color match
  if (sneakerColors.accent === outfitColors.accent) {
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

// Filter matches by category
export const filterMatchesByCategory = (matches: Outfit[], category: string): Outfit[] => {
  if (!category || category === 'all') {
    return matches;
  }
  
  return matches.filter(outfit => outfit.styles.includes(category));
};