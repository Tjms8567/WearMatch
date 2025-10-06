import Link from 'next/link'
import FeaturedSneakers from '@/components/FeaturedSneakers'
import HeroSlider from '@/components/HeroSlider'
import BrandsList from '@/components/BrandsList'
import SocialFeed from '@/components/SocialFeed'
import StyleLens from '@/components/StyleLens'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <HeroSlider />
      
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Featured Sneakers</h2>
        <FeaturedSneakers />
      </section>
      
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6">Browse by Brand</h2>
        <BrandsList />
      </section>
      
      <section className="my-12 bg-gray-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Find Your Perfect Match</h2>
        <p className="text-lg mb-6">Discover outfits that perfectly complement your favorite sneakers</p>
        <Link href="/sneakers" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition">
          Start Matching
        </Link>
        <Link href="/cart" className="ml-4 bg-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-green-600 transition">
          View Cart
        </Link>
      </section>

      <SocialFeed />

      <StyleLens />
    </div>
  )
}