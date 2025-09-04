"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "../login/Login.module.css";

import Input from "@/components/form/Input";
import SubmitButton from "@/components/form/SubmitButton";
import Link from "next/link";
import Image from "next/image";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    emailConfirmation: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validação básica (pode ser substituída por Zod ou Yup futuramente)
    if (formData.email !== formData.emailConfirmation) {
      alert("Os e-mails não coincidem.");
      return;
    }

    if (formData.password !== formData.passwordConfirmation) {
      alert("As senhas não coincidem.");
      return;
    }

    // Aqui você pode enviar os dados para o backend futuramente
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <section>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Image
          src="/assets/logos/logo_customy_white.png"
          alt="Logo"
          width={150}
          height={150}
          priority={true}
        />

        <Input
          type="text"
          text="Digite seu e-mail"
          name="email"
          placeholder="example@email.com"
          value={formData.email}
          handleOnChange={handleChange}
        />

        <Input
          type="text"
          text="Digite o e-mail novamente"
          name="emailConfirmation"
          placeholder="example@email.com"
          value={formData.emailConfirmation}
          handleOnChange={handleChange}
        />

        <Input
          type="password"
          text="Crie uma senha"
          name="password"
          placeholder="Digite sua senha"
          value={formData.password}
          handleOnChange={handleChange}
        />

        <Input
          type="password"
          text="Digite a senha novamente"
          name="passwordConfirmation"
          placeholder="Digite sua senha"
          value={formData.passwordConfirmation}
          handleOnChange={handleChange}
        />

        <SubmitButton text="REGISTRAR" customClass="btn" />

        <Link href="/login">
          <p className={styles.backLink}>Já tem uma conta? Faça login</p>
        </Link>
      </form>
    </section>
  );
}
