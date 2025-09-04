'use client'

import styles from './Customers.module.css'

import Input from '@/components/form/Input'
import SubmitButton from '@/components/form/SubmitButton'
import Customer from '@/components/customers_page/Customer'
import Container from '@/components/layout/Container'
import BigButton from '@/components/global/BigButton'

import Link from 'next/link'
import { useEffect, useState, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { fetchCustomers } from '@/store/features/customerSlice'

export default function Customers() {
  const dispatch = useAppDispatch()
  const customers = useAppSelector((state) => state.customers.data)
  const loading = useAppSelector((state) => state.customers.loading)

  const [search, setSearch] = useState('')
  const [filteredCustomers, setFilteredCustomers] = useState(customers)

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [dispatch])

  useEffect(() => {
    setFilteredCustomers(customers)
  }, [customers])

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredCustomers(filtered)
  }

  return (
    <Container>
      <div className={styles.centralize}>
        <div className={styles.top}>
          <h1 className={styles.title}>Clientes</h1>
          <Input
            type="text"
            name="busca"
            placeholder="Faça sua busca"
            aria-label="Campo de busca"
            value={search}
            handleOnChange={handleSearchChange}
          />
          <SubmitButton
            text="BUSCAR"
            customClass="signupBtn"
            onClick={handleSearch}
          />
        </div>

        <div className={styles.customersList}>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            filteredCustomers.map((customer) => (
              <Customer key={customer.id} id={customer.id} name={customer.name} />
            ))
          )}
        </div>

        <div className={styles.buttons}>
          <Link href="/customers/new">
            <BigButton icon="newCostumer" name="NOVO CLIENTE" />
          </Link>
          <Link href="/login">
            <SubmitButton text="DESLOGAR" customClass="logoffBtn" />
          </Link>
        </div>
      </div>
    </Container>
  )
}
