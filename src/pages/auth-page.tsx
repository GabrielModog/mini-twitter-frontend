import { useState, type ReactNode } from "react"
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Eye, EyeOff, Mail, User } from "lucide-react";

const loginSchema = z.object({
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

const registerSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  email: z.email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
})

type LoginForm = z.infer<typeof loginSchema>
type RegisterForm = z.infer<typeof registerSchema>

interface TabProps {
  label: string
  content: ReactNode
}

interface TabsProps {
  defaultTab?: number
  tabs: TabProps[]
}

function Tabs(props: TabsProps) {
  const { defaultTab = 0, tabs } = props
  const [active, setActive] = useState(defaultTab)
  return (
    <div className="w-full mx-auto">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActive(idx)}
            className={`
              flex-1 py-4 text-center font-bold transition-colors
              ${active === idx
                ? 'border-b-4 border-sky-500 text-sky-500'
                : 'text-gray-500 hover:text-gray-400'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-8">{tabs[active].content}</div>
    </div>
  )
}

interface InputProps {
  label: string
  name: string
  type: string
  placeholder: string
  icon?: ReactNode | null
}

function Input(props: InputProps) {
  const { label, name, type, placeholder, icon } = props
  const { register, formState: { errors } } = useFormContext()
  const error = errors[name]?.message

  const [showPassword, setShowPasword] = useState(false)

  const isPasswordField = type === "password" || name.includes("password")
  const hasIcon = !isPasswordField && icon
  const inputType = isPasswordField && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <label className="block text-sm font-normal text-gray-500">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full h-14.25 bg-white px-4 py-3 border rounded-lg outline-none
            focus:border-blue-500 transition text-gray-800 font-medium
            ${error ? 'border-red-500' : 'border-gray-200'}
          `}
          {...register(name)}
        />
        {hasIcon && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none transition">{icon}</span>}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPasword(prev => !prev)}
            aria-label={showPassword ? "Ocultar Senha" : "Mostrar Senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer focus:outline-none transition"
          >
            {showPassword ? (<EyeOff className="w-5 h-5" />) : (<Eye className="w-5 h-5" />)}
          </button>
        )}
      </div>
      {error && <p className="text-red-400 text-sm">{error.toString()}</p>}
    </div>
  )
}

function LoginForm() {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const { handleSubmit, formState: { isSubmitting } } = methods

  async function onSubmit(data: any) {
    console.log('[debug] login - data', data);
    await new Promise(r => setTimeout(r, 1200));
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col mt-12 mb-10">
        <h3 className="text-3xl font-bold text-sky-500 mb-2">Olá, de novo!</h3>
        <p className="text-md font-normal text-gray-500">Por favor, insira os seus dados para fazer login.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="E-mail" type="email" name="email" placeholder="Insira o seu e-mail" icon={<Mail  className="w-5 h-5"/>} />
        <Input label="Senha" name="password" type="password" placeholder="Insira o sua senha" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-white py-3 bg-sky-500 hover:bg-sky-700 rounded-4xl font-medium transition disabled:opacity-60 cursor-pointer shadow-lg shadow-blue-200"
        >
          {isSubmitting ? 'Fazendo Login...' : 'Continuar'}
        </button>
      </form>
    </FormProvider>
  )
}

function RegisterForm() {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  async function onSubmit(data: any) {
    console.log('[debug] login - data', data);
    await new Promise(r => setTimeout(r, 1200));
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col mt-12 mb-10">
        <h3 className="text-3xl font-bold text-sky-500 mb-2">Olá, vamos começar!</h3>
        <p className="text-md font-normal text-gray-500">Por favor, insira os dados solicitados para fazer cadastro.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Nome" type="text" name="name" placeholder="Insira o seu nome" icon={<User className="w-5 h-5" />} />
        <Input label="E-mail" type="email" name="email" placeholder="Insira o seu e-mail" icon={<Mail  className="w-5 h-5"/>} />
        <Input label="Senha" name="password" type="password" placeholder="Insira o sua senha" />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 text-white py-3 bg-sky-500 hover:bg-sky-700 rounded-4xl font-medium transition disabled:opacity-60 cursor-pointer shadow-lg shadow-blue-200"
        >
          {isSubmitting ? 'Criando...' : 'Continuar'}
        </button>
      </form>
    </FormProvider>
  );
}

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