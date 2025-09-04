'use client'

import styles from './BigButton.module.css'

interface BigButtonProps {
  icon: 'newCostumer' | 'newNote' | 'save'
  name: string
}

export default function BigButton({ icon, name }: BigButtonProps) {
  return (
    <div className={styles.button}>
      <div className={styles[icon]}></div>
      <span>{name}</span>
    </div>
  )
}
