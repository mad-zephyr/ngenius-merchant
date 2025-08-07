import './globals.sass'

import clsx from 'clsx'
import type { Metadata } from 'next'
import { Geist_Mono, Noto_Sans } from 'next/font/google'

import { BASE_PATH } from '@/shared/lib/constants'

import classes from './layout.module.sass'

const geistSans = Noto_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'N-Genius Payment Integration Demo',
  description:
    'A lightweight, end-to-end sample that demonstrates how to embed the N-Genius Payments Hosted Session flow into a modern web application.',
  openGraph: {
    title: 'N-Genius Payment Integration Demo',
    images: [
      {
        url: `${BASE_PATH}/og-image.png`,
        height: 630,
        width: 1200,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N-Genius Payment Integration Demo',
    description:
      'A lightweight, end-to-end sample that demonstrates how to embed the N-Genius Payments Hosted Session flow into a modern web application.',
    images: `${BASE_PATH}/og-image.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const classname = clsx(geistSans.variable, geistMono.variable, classes.layout)

  return (
    <>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <body className={classname}>{children}</body>
      </html>
    </>
  )
}
