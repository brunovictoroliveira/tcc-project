"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "@/app/(main)/@modal/customers/forms.module.css";

import Input from "@/components/form/Input";
import BigButton from "@/components/global/BigButton";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";

interface CustomerForm {
  customerName: string;
  phoneNumber: string;
  email: string;
}

export default function EditCustomer() {
  const { id } = useParams();
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerForm>({
    customerName: "",
    phoneNumber: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:3001/customers/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar cliente.");
        const data = await response.json();
        setCustomer({
          customerName: data.name || "",
          phoneNumber: data.phone || "",
          email: data.email || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do cliente.");
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const updatedCustomer = {
        name: customer.customerName,
        phone: customer.phoneNumber,
        email: customer.email,
      };

      const response = await fetch(`http://localhost:3001/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });

      if (!response.ok) throw new Error("Erro ao atualizar cliente.");

      router.push("/customers");
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar o cliente. Tente novamente.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Editar cliente</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.inputs}>
          <Input
            type="text"
            text="Nome"
            name="customerName"
            placeholder="Digite o nome do(a) cliente"
            value={customer.customerName}
            handleOnChange={handleChange}
          />
          <Input
            type="phone"
            text="Telefone"
            name="phoneNumber"
            placeholder="(00) 00000-0000"
            value={customer.phoneNumber}
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
      )}
      <div className={styles.buttons}>
        <button type="submit">
          <BigButton icon="save" name="SALVAR" />
        </button>
        <Link href="/customers">
          <SubmitButton text="VOLTAR" customClass="logoffBtn" />
        </Link>
      </div>
    </form>
  );
}
