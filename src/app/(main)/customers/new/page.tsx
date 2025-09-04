"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "@/app/(main)/@modal/customers/forms.module.css";

import Input from "@/components/form/Input";
import BigButton from "@/components/global/BigButton";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hooks";
import { addCustomer } from "@/store/features/customerSlice";

interface CustomerData {
  name: string;
  phone: string;
  email: string;
}

export default function NewCustomer() {
  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);

    if (!customer.name || !customer.phone || !customer.email) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await dispatch(addCustomer(customer)).unwrap();
      setSuccess(true);
      router.push("/customers");
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      setError("Erro ao criar cliente. Tente novamente.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Novo cliente</h1>
      <div className={styles.inputs}>
        <Input
          type="text"
          text="Nome"
          name="name"
          placeholder="Digite o nome do(a) cliente"
          value={customer.name}
          handleOnChange={handleChange}
        />
        <Input
          type="phone"
          text="Telefone"
          name="phone"
          placeholder="(00) 00000-0000"
          value={customer.phone}
          handleOnChange={handleChange}
        />
        <Input
          type="email"
          text="E-mail"
          name="email"
          placeholder="example@email.com"
          value={customer.email}
          handleOnChange={handleChange}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit">
          <BigButton icon="save" name="SALVAR" />
        </button>
        <Link href="/customers">
          <SubmitButton text="VOLTAR" customClass="logoffBtn" />
        </Link>
      </div>
      {success && <p className={styles.success}>Cliente criado com sucesso!</p>}
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
