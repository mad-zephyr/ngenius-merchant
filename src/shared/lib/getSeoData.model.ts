import { Metadata } from 'next'

import { BASE_PATH } from './constants'

export const generateSeo = async (): Promise<Metadata> => {
  return {
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
}
