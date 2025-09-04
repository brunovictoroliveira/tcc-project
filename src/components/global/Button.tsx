'use client'

import styles from './Button.module.css'

interface ButtonProps {
  type: string
  onClick?: () => void
}

export default function Button({ type, onClick }: ButtonProps) {
  return <div className={styles[type]} onClick={onClick}></div>
}
