import Tabs from "../../../components/tabs"
import LoginForm from "../components/forms/login-form"
import RegisterForm from "../components/forms/register-form"

export default function AuthPage() {
  const tabs = [
    { label: 'Login', content: <LoginForm /> },
    { label: 'Cadastrar', content: <RegisterForm /> },
  ]
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
      <div className="w-full max-w-120 h-186.25">
        <h1 className="text-4xl font-bold text-sky-500 text-center mb-10">
          Mini Twitter
        </h1>
        <Tabs tabs={tabs} />
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