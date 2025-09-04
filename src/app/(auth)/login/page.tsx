"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Login.module.css";

import Input from "@/components/form/Input";
import SubmitButton from "@/components/form/SubmitButton";

import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Simulação de autenticação
    if (
      formData.email === "teste@email.com" &&
      formData.password === "123456"
    ) {
      alert("Login bem-sucedido!");
      router.push("/customers");
    } else {
      setError("E-mail ou senha inválidos.");
    }
  };

  return (
    <section>
      <div className={styles.loginForm}>
        <Image
          src="/assets/logos/logo_customy_white.png"
          alt="Logo"
          width={150}
          height={150}
          priority={true}
        />

        <form onSubmit={handleLogin}>
          <Input
            type="text"
            text="E-mail"
            name="email"
            placeholder="Digite seu e-mail"
            value={formData.email}
            handleOnChange={handleChange}
          />

          <Input
            type="password"
            text="Senha"
            name="password"
            placeholder="Digite sua senha"
            value={formData.password}
            handleOnChange={handleChange}
          />

          {error && <p className={styles.error}>{error}</p>}

          <SubmitButton text="LOGIN" />
        </form>

        <span>Não tem uma conta?</span>

        <Link href="/signup">
          <SubmitButton text="REGISTRE-SE" customClass="signupBtn" />
        </Link>

        <span className={styles.recoverPass}>Esqueci minha senha</span>
      </div>
    </section>
  );
}
