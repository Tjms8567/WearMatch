'use client';
import { useContentContext } from '@/context/ContentContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroSlider() {
  const { slides } = useContentContext();
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  const current = slides[index] ?? slides[0];

  return (
    <section className="relative overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10 z-10" />
          <div className="relative h-[420px]">
            <AnimatePresence initial={false}>
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title || 'Slide'}
                className="w-full h-full object-cover"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-start justify-center p-8 md:p-12 text-white">
            {current.title && (
              <h2 className="text-3xl md:text-5xl font-extrabold drop-shadow mb-3">{current.title}</h2>
            )}
            {current.subtitle && (
              <p className="text-lg md:text-xl mb-6 max-w-xl text-white/90">{current.subtitle}</p>
            )}
            {current.ctaHref && current.ctaText && (
              <Link href={current.ctaHref} className="px-6 py-3 bg-primary text-white rounded-lg font-medium shadow hover:shadow-lg">
                {current.ctaText}
              </Link>
            )}
          </div>
          <div className="absolute inset-0 z-30 flex items-center justify-between p-4">
            <button onClick={prev} className="bg-white/80 hover:bg-white text-gray-900 rounded-full w-10 h-10 flex items-center justify-center">‹</button>
            <button onClick={next} className="bg-white/80 hover:bg-white text-gray-900 rounded-full w-10 h-10 flex items-center justify-center">›</button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
