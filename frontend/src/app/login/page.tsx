import React from 'react'
import AuthTabs from '@/components/Login/AuthTabs'

export default function Login() {
  return (
    <div className="flex min-h-screen">
      {/* Parte esquerda preta */}
      <div className="flex-1 bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Bem-vindo ao Meu App</h1>
      </div>

      {/* Parte direita com abas */}
      <div className="flex-1 bg-base-100 flex items-center justify-center">
        <AuthTabs />
      </div>
    </div>
  )
}
