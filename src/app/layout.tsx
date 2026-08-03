import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sony WH-1000XM6 | Silence, perfected.',
  description: 'Experience the ultimate in noise cancellation and immersive audio with the Sony WH-1000XM6.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white overflow-x-hidden min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
