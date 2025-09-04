"use client";

import styles from "./NoteCard.module.css";
import Button from "@/components/global/Button";

interface NoteCardProps {
  title: string;
  content?: string;
  date: string;
  onExpand?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function NoteCard({
  title,
  content = "",
  date,
  onExpand,
  onEdit,
  onDelete,
}: NoteCardProps) {
  const formattedDate = (() => {
    const parsed = new Date(date);
    return isNaN(parsed.getTime())
      ? "Data inválida"
      : parsed.toLocaleDateString("pt-BR");
  })();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.buttons}>
          {onExpand && <Button type="ExpandButton" onClick={onExpand} />}
          {onEdit && <Button type="EditButton" onClick={onEdit} />}
          {onDelete && <Button type="DeleteButton" onClick={onDelete} />}
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{content}</div>
    </div>
  );
}
