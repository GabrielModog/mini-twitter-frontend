import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router"

import Logo from "@/components/logo"
import Tabs from "@/components/tabs"
import LoginForm from "@/features/auth/components/forms/login-form"
import RegisterForm from "@/features/auth/components/forms/register-form"
import { useAuthStore } from "@/features/auth/store"

export default function AuthPage() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()

  const mode = searchParams.get('mode')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/posts', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const tabs = [
    { id: 'login', label: 'Login', content: <LoginForm /> },
    { id: 'register', label: 'Cadastrar', content: <RegisterForm /> },
  ]

  const defaultTab = mode ? tabs.findIndex(x => x.id === mode) ?? 0 : 0
  
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
      <div className="w-full max-w-120 h-186.25">
        <div className="text-center mb-10">
          <Logo />
        </div>
        <Tabs tabs={tabs} defaultTab={defaultTab} />
        <div className="my-10 pb-4">
          <p className="text-center text-xs text-gray-800">
            Ao clicar em continuar, você concorda com nossos<br />
            <span className="underline">Termos de Serviço e Política de Privacidade.</span>
          </p>
        </div>
      </div>
    </div>
  )
}