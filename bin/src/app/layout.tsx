import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SneakerProvider } from '@/context/SneakerContext'
import { CartProvider } from '@/context/CartContext'
import { ThemeProvider } from 'next-themes'
import { ContentProvider } from '@/context/ContentContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WearMatch - Sneaker & Outfit Matching',
  description: 'Find the perfect outfit to match your favorite sneakers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ContentProvider>
              <SneakerProvider>
                <CartProvider>
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </CartProvider>
              </SneakerProvider>
            </ContentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}