'use client'

import styles from './Customer.module.css'
import Button from '@/components/global/Button'
import Link from 'next/link'

interface CustomerProps {
  id: string | number
  name: string
}

export default function Customer({ id, name }: CustomerProps) {
  return (
    <div className={styles.container_inline}>
      <div className={styles.bar}>
        {/* Link direto no nome do cliente para Notes */}
        <Link href={`/notes/${id}`} className={styles.name}>
          {name}
        </Link>
        <div className={styles.buttons}>
          <Link href={`/customers/edit/${id}`}>
            <Button type="EditButton" />
          </Link>
          <Button type="DeleteButton" />
        </div>
      </div>
    </div>
  )
}
