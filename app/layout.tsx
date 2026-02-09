import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Sarabun } from 'next/font/google'

import './globals.css'

const _playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})
const _sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sarabun',
})

export const metadata: Metadata = {
  title: 'Happy Valentine\'s Day',
  description: 'A love letter for you on Valentine\'s Day',
}

export const viewport: Viewport = {
  themeColor: '#d4607a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th">
      <body className="font-sans antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
