"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Recuperar token e dados do usuário no carregamento
    const tokenLocal = localStorage.getItem("token");
    const usuarioLocal = localStorage.getItem("usuario");

    if (tokenLocal && usuarioLocal) {
      setToken(tokenLocal);
      setUsuario(JSON.parse(usuarioLocal));
    }

    setLoading(false);
  }, []);

  async function login(email: string, senha: string) {
    setLoading(true);
    try {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro no login");

      localStorage.setItem("token", data?.data?.token);
      localStorage.setItem("usuario", JSON.stringify(data.data.usuario));

      setToken(data.data.token);
      setUsuario(data.data.usuario);

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setToken(null);
    setUsuario(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
