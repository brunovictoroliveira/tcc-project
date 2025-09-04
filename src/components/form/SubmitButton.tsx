'use client'

import styles from './SubmitButton.module.css'

interface SubmitButtonProps {
  text: string
  customClass?: string
  onClick?: () => void
}

export default function SubmitButton({
  text,
  customClass = '',
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      className={`${styles.btn} ${customClass ? styles[customClass] : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
