'use client'

import styles from './Input.module.css'

interface InputProps {
  type: string
  name: string
  text?: string
  placeholder?: string
  value: string
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  ariaLabel?: string
}

export default function Input({
  type,
  name,
  text,
  placeholder,
  value,
  handleOnChange,
  ariaLabel,
}: InputProps) {
  return (
    <div className={styles.form_control}>
      {text && <label htmlFor={name}>{text}</label>}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
        aria-label={ariaLabel}
        className={styles.input}
      />
    </div>
  )
}
