'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-transparent to-secondary/15" />
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-center mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Match Your Sneakers with Perfect Outfits
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Find stylish combinations that complement your favorite sneakers using our color + style matching.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/sneakers" className="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow hover:shadow-md transition">
              Browse Sneakers
            </Link>
            <Link href="/brands" className="px-6 py-3 rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50 font-medium transition">
              Explore Brands
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="pointer-events-none select-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="pointer-events-none select-none absolute -bottom-24 -left-24 w-[360px] h-[360px] rounded-full bg-secondary/10 blur-3xl"
        />
      </div>
    </section>
  );
}