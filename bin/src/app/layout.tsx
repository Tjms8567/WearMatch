import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SneakerProvider } from '@/context/SneakerContext'
import { CartProvider } from '@/context/CartContext'
import { OrdersProvider } from '@/context/OrdersContext'
import { ThemeProvider } from 'next-themes'
import { ContentProvider } from '@/context/ContentContext'
import { AuthProvider } from '@/context/AuthContext'
import { MessagesProvider } from '@/context/MessagesContext'

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
                <OrdersProvider>
                  <MessagesProvider>
                    <CartProvider>
                      <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                          {children}
                        </main>
                        <Footer />
                      </div>
                    </CartProvider>
                  </MessagesProvider>
                </OrdersProvider>
              </SneakerProvider>
            </ContentProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}