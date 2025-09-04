"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./Notes.module.css";

import NoteCard from "@/components/notes_page/NoteCard";
import Container from "@/components/layout/Container";
import BigButton from "@/components/global/BigButton";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchNotes } from "@/store/features/noteSlice";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export default function Notes() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const notes = useAppSelector((state) => state.notes.data);
  const loading = useAppSelector((state) => state.notes.loading);
  const error = useAppSelector((state) => state.notes.error);

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerError, setCustomerError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(fetchNotes(id));

      fetch(`http://localhost:3001/customers/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar cliente.");
          return res.json();
        })
        .then((data) => setCustomer(data))
        .catch((err) => {
          console.error(err);
          setCustomerError("Não foi possível carregar os dados do cliente.");
        });
    }
  }, [id, dispatch]);

  const sortedNotes = [...notes]
    .filter(
      (note) =>
        typeof note.date === "string" && !isNaN(new Date(note.date).getTime())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (loading) {
    return <p className={styles.loading}>Carregando...</p>;
  }

  if (error || customerError) {
    return (
      <div>
        <p className={styles.error}>{error || customerError}</p>
        <button onClick={() => router.refresh()}>Tentar novamente</button>
      </div>
    );
  }

  if (!customer) {
    return (
      <p className={styles.error}>Informações do cliente não disponíveis.</p>
    );
  }

  return (
    <Container>
      <div className={styles.header}>
        <h1 className={styles.customerName}>{customer.name}</h1>
        <h3 className={styles.phoneNumber}>{customer.phone}</h3>
        <div className={styles.title}>Histórico</div>
      </div>

      <div className={styles.notesList}>
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note) => (
            <NoteCard
              key={note.id}
              title={note.title}
              content={note.note || ""}
              date={new Date(note.date).toISOString()}
            />
          ))
        ) : (
          <p className={styles.noNotes}>Nenhuma anotação encontrada.</p>
        )}
      </div>

      <Link href={`/notes/new?customerId=${id}`}>
        <BigButton icon="newNote" name="NOVA ANOTAÇÃO" />
      </Link>
      <Link href="/customers">
        <SubmitButton text="VOLTAR" customClass="logoffBtn" />
      </Link>
    </Container>
  );
}
