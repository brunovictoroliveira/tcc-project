'use client'

import styles from './Container.module.css'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  customClass?: string
}

export default function Container({ children, customClass = '' }: ContainerProps) {
  return <div className={`${styles.container} ${customClass}`}>{children}</div>
}
