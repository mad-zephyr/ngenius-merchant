import { Link } from '@/shared'

import styles from './page.module.sass'

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href="/cart">
        <h1>Go to cart page</h1>
      </Link>
    </div>
  )
}
