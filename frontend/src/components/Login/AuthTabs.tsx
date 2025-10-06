'use client'

import { useState } from 'react'
import LoginForm from './LoginForm'

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="tabs tabs-boxed mb-6">
        <button
          className={`tab ${activeTab === 'login' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === 'register' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Cadastro
        </button>
      </div>

      {/* Conteúdo da aba */}
      <div>
        {activeTab === 'login' && <LoginForm />}
        {activeTab === 'register' && (
          <div className="text-center text-gray-500">
            Formulário de cadastro não implementado
          </div>
        )}
      </div>
    </div>
  )
}
