'use client'

import styles from './NoteCard.module.css'
import Button from '@/components/global/Button'

interface NoteCardProps {
  title: string
  content?: string
  date: string
  onExpand?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export default function NoteCard({
  title,
  content,
  date,
  onExpand,
  onEdit,
  onDelete,
}: NoteCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.date}>{new Date(date).toLocaleDateString()}</div>
        <div className={styles.buttons}>
          <Button type="ExpandButton" onClick={onExpand} />
          <Button type="EditButton" onClick={onEdit} />
          <Button type="DeleteButton" onClick={onDelete} />
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{content}</div>
    </div>
  )
}
