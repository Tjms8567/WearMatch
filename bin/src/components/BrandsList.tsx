'use client';
import Link from 'next/link';
import { useSneakerContext } from '@/context/SneakerContext';
import { motion } from 'framer-motion';

export default function BrandsList() {
  const { getAllBrands } = useSneakerContext();
  const brands = getAllBrands();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {brands.map((brand, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}>
          <Link 
            href={`/brands/${brand.toLowerCase()}`}
            className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg text-center transition block"
          >
            <h3 className="text-xl font-semibold">{brand}</h3>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}