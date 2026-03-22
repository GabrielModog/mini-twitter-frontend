import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";

import { loginSchema } from "@/features/auth/schemas";
import { Input } from "@/components/input";
import Button from "@/components/button";
import { useLoginMutation } from "@/features/auth/queries";

export default function LoginForm() {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const [isPending, startTransition] = useTransition()
  const login = useLoginMutation();

  const errors = methods.formState.errors

  function onSubmit(data: any) {
    startTransition(async () => {
      await login.mutateAsync(data)
    })
  }

  return (
    <>
      <div className="flex flex-col mt-12 mb-10">
        <h3 className="text-3xl font-bold text-sky-500 dark:text-white mb-2">Olá, de novo!</h3>
        <p className="text-md font-normal text-gray-500">Por favor, insira os seus dados para fazer login.</p>
      </div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <Input 
          register={methods.register}
          error={errors["email"]?.message}
          label="E-mail"
          type="email"
          name="email"
          placeholder="Insira o seu e-mail" icon={<Mail  className="w-5 h-5"/>} 
        />
        <Input 
          register={methods.register}
          error={errors["password"]?.message}
          label="Senha"
          name="password"
          type="password"
          placeholder="Insira o sua senha" 
        />

        <Button type="submit" label="Continuar" loading={isPending} />
      </form>
    </>
  )
}