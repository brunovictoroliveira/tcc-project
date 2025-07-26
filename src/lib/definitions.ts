// src/lib/definitions.ts

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
}

export interface Note {
  id: string;
  customerId: string;
  date: Date;
  title: string;
  note: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}
