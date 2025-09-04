"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./forms.module.css";

import Input from "@/components/form/Input";
import BigButton from "@/components/global/BigButton";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";

export default function NewNote() {
  const [note, setNote] = useState({ title: "", note: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [nextId, setNextId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const customerId = searchParams.get("customerId");

  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const response = await fetch("http://localhost:3001/notes");
        const data = await response.json();
        const maxId = data.reduce(
          (max: number, note: any) => Math.max(max, Number(note.id) || 0),
          0
        );
        setNextId(String(maxId + 1));
      } catch (err) {
        console.error("Erro ao buscar o próximo ID:", err);
        setNextId("1");
      }
    };

    fetchNextId();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  const getFormattedDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!note.title || !note.note) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (!customerId) {
      setError("ID do cliente não identificado.");
      return;
    }

    const newNote = {
      id: nextId,
      customerId,
      date: getFormattedDate(),
      timestamp: new Date().toISOString(),
      ...note,
    };

    try {
      await fetch("http://localhost:3001/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      setSuccess(true);
      router.push(`/notes/${customerId}`);
    } catch (err) {
      console.error("Erro ao criar anotação:", err);
      setError("Erro ao criar anotação. Tente novamente.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Nova anotação</h1>

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
        <Link href={customerId ? `/notes/${customerId}` : "/notes"}>
          <SubmitButton text="VOLTAR" customClass="logoffBtn" />
        </Link>
      </div>

      {success && (
        <p className={styles.success}>Anotação criada com sucesso!</p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
