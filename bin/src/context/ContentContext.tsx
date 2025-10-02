'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface HeroSlide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface TextDesign {
  id: string;
  name: string;
  svg: string; // raw SVG string
}

interface ContentContextType {
  slides: HeroSlide[];
  designs: TextDesign[];
  addSlide: (s: HeroSlide) => void;
  removeSlide: (id: string) => void;
  addDesign: (d: TextDesign) => void;
  removeDesign: (id: string) => void;
  exportContent: () => { slides: HeroSlide[]; designs: TextDesign[] };
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultSlides: HeroSlide[] = [
  {
    id: 'slide1',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1400&auto=format&fit=crop',
    title: 'Style your kicks',
    subtitle: 'Find outfits that match your sneakers',
    ctaText: 'Start Matching',
    ctaHref: '/sneakers',
  },
  {
    id: 'slide2',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop',
    title: 'Fresh drops',
    subtitle: 'Discover latest sneakers and looks',
    ctaText: 'Browse Sneakers',
    ctaHref: '/sneakers',
  },
];

const defaultDesigns: TextDesign[] = [
  {
    id: 'design1',
    name: 'Streetwear',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" viewBox="0 0 120 30"><text x="0" y="22" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="22">Streetwear</text></svg>',
  },
  {
    id: 'design2',
    name: 'Vintage',
    svg: '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="30" viewBox="0 0 120 30"><text x="0" y="22" font-family="Georgia, serif" font-size="22">Vintage</text></svg>',
  },
];

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides);
  const [designs, setDesigns] = useState<TextDesign[]>(defaultDesigns);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = localStorage.getItem('wearmatch_slides');
    const d = localStorage.getItem('wearmatch_designs');
    setSlides(s ? (JSON.parse(s) as HeroSlide[]) : defaultSlides);
    setDesigns(d ? (JSON.parse(d) as TextDesign[]) : defaultDesigns);
  }, []);

  const persistSlides = (next: HeroSlide[]) => {
    setSlides(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_slides', JSON.stringify(next));
  };
  const persistDesigns = (next: TextDesign[]) => {
    setDesigns(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_designs', JSON.stringify(next));
  };

  const value: ContentContextType = {
    slides,
    designs,
    addSlide: (s) => persistSlides([...slides, s]),
    removeSlide: (id) => persistSlides(slides.filter((x) => x.id !== id)),
    addDesign: (d) => persistDesigns([...designs, d]),
    removeDesign: (id) => persistDesigns(designs.filter((x) => x.id !== id)),
    exportContent: () => ({ slides, designs }),
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContentContext() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentContext must be used within ContentProvider');
  return ctx;
}
