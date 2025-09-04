"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./forms.module.css";

import Input from "@/components/form/Input";
import BigButton from "@/components/global/BigButton";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";

interface Note {
  id: string;
  customerId: string;
  title: string;
  note: string;
  date: string;
  timestamp?: string;
}

export default function EditNote() {
  const { noteId } = useParams();
  const router = useRouter();

  const [note, setNote] = useState<Note | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof noteId === "string") {
      fetch(`http://localhost:3001/notes/${noteId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar anotação.");
          return res.json();
        })
        .then((data) => setNote(data))
        .catch((err) => {
          console.error(err);
          setError("Não foi possível carregar a anotação.");
        });
    }
  }, [noteId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!note?.title || !note.note) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const updatedNote = {
        ...note,
        timestamp: new Date().toISOString(),
      };

      await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedNote),
      });

      setSuccess(true);
      router.push(`/notes/${note.customerId}`);
    } catch (err) {
      console.error("Erro ao atualizar anotação:", err);
      setError("Erro ao atualizar anotação. Tente novamente.");
    }
  };

  if (!note) {
    return <p className={styles.loading}>Carregando anotação...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Editar anotação</h1>

      <div className={styles.inputs}>
        <Input
          type="text"
          text="Título"
          name="title"
          placeholder="Digite o título da anotação"
          value={note.title}
          handleOnChange={handleChange}
        />
        <Input
          type="textarea"
          text="Conteúdo"
          name="note"
          placeholder="Escreva sua anotação"
          value={note.note}
          handleOnChange={handleChange}
        />
      </div>

      <div className={styles.buttons}>
        <button type="submit">
          <BigButton icon="save" name="SALVAR" />
        </button>
        <Link href={`/notes/${note.customerId}`}>
          <SubmitButton text="VOLTAR" customClass="logoffBtn" />
        </Link>
      </div>

      {success && (
        <p className={styles.success}>Anotação atualizada com sucesso!</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
