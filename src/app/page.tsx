import { Metadata } from 'next'

import { Link } from '@/shared'
import { generateSeo } from '@/shared/lib/getSeoData.model'

import styles from './page.module.sass'

export async function generateMetadata(): Promise<Metadata> {
  return await generateSeo()
}

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/cart">
        <h1>Go to Cart page</h1>
      </Link>
      <Link href="/subscription">
        <h1>Go to Subscription page</h1>
      </Link>
    </div>
  )
}
