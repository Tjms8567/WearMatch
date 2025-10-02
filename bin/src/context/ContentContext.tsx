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

export type SocialType = 'facebook' | 'instagram' | 'youtube';
export interface SocialItem {
  id: string;
  type: SocialType;
  url: string;
  title?: string;
  thumb?: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[]; // hex or names
}

interface ContentContextType {
  slides: HeroSlide[];
  designs: TextDesign[];
  social: SocialItem[];
  palettes: ColorPalette[];
  tokens: { facebook?: string; instagram?: string; youtube?: string };
  addSlide: (s: HeroSlide) => void;
  removeSlide: (id: string) => void;
  addDesign: (d: TextDesign) => void;
  removeDesign: (id: string) => void;
  addSocial: (i: SocialItem) => void;
  removeSocial: (id: string) => void;
  addPalette: (p: ColorPalette) => void;
  removePalette: (id: string) => void;
  setTokens: (t: Partial<{ facebook: string; instagram: string; youtube: string }>) => void;
  exportContent: () => { slides: HeroSlide[]; designs: TextDesign[]; social: SocialItem[]; palettes: ColorPalette[] };
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
  const [social, setSocial] = useState<SocialItem[]>([]);
  const [palettes, setPalettes] = useState<ColorPalette[]>([]);
  const [tokens, setTokensState] = useState<{ facebook?: string; instagram?: string; youtube?: string }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const s = localStorage.getItem('wearmatch_slides');
    const d = localStorage.getItem('wearmatch_designs');
    const so = localStorage.getItem('wearmatch_social');
    const pa = localStorage.getItem('wearmatch_palettes');
    const tk = localStorage.getItem('wearmatch_tokens');
    setSlides(s ? (JSON.parse(s) as HeroSlide[]) : defaultSlides);
    setDesigns(d ? (JSON.parse(d) as TextDesign[]) : defaultDesigns);
    setSocial(so ? (JSON.parse(so) as SocialItem[]) : []);
    setPalettes(pa ? (JSON.parse(pa) as ColorPalette[]) : []);
    setTokensState(tk ? (JSON.parse(tk) as any) : {});
  }, []);

  const persistSlides = (next: HeroSlide[]) => {
    setSlides(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_slides', JSON.stringify(next));
  };
  const persistDesigns = (next: TextDesign[]) => {
    setDesigns(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_designs', JSON.stringify(next));
  };
  const persistSocial = (next: SocialItem[]) => {
    setSocial(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_social', JSON.stringify(next));
  };
  const persistPalettes = (next: ColorPalette[]) => {
    setPalettes(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_palettes', JSON.stringify(next));
  };
  const persistTokens = (next: typeof tokens) => {
    setTokensState(next);
    if (typeof window !== 'undefined') localStorage.setItem('wearmatch_tokens', JSON.stringify(next));
  };

  const value: ContentContextType = {
    slides,
    designs,
    social,
    palettes,
    tokens,
    addSlide: (s) => persistSlides([...slides, s]),
    removeSlide: (id) => persistSlides(slides.filter((x) => x.id !== id)),
    addDesign: (d) => persistDesigns([...designs, d]),
    removeDesign: (id) => persistDesigns(designs.filter((x) => x.id !== id)),
    addSocial: (i) => persistSocial([...social, i]),
    removeSocial: (id) => persistSocial(social.filter(x => x.id !== id)),
    addPalette: (p) => persistPalettes([...palettes, p]),
    removePalette: (id) => persistPalettes(palettes.filter(x => x.id !== id)),
    setTokens: (t) => persistTokens({ ...tokens, ...t }),
    exportContent: () => ({ slides, designs, social, palettes }),
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContentContext() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContentContext must be used within ContentProvider');
  return ctx;
}
