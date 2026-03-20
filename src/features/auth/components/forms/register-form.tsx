import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Mail, User } from "lucide-react";

import { registerSchema } from "../../schemas";
import { Input } from "../../../../components/input";
import SubmitButton from "../submit-button";
import { useTransition } from "react";

export default function RegisterForm() {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: any) {
    startTransition(async () => {
      console.log('[debug] login - data', data);
      await new Promise(r => setTimeout(r, 1200));
    })
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col mt-12 mb-10">
        <h3 className="text-3xl font-bold text-sky-500 mb-2">Olá, vamos começar!</h3>
        <p className="text-md font-normal text-gray-500">Por favor, insira os dados solicitados para fazer cadastro.</p>
      </div>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <Input label="Nome" type="text" name="name" placeholder="Insira o seu nome" icon={<User className="w-5 h-5" />} />
        <Input label="E-mail" type="email" name="email" placeholder="Insira o seu e-mail" icon={<Mail  className="w-5 h-5"/>} />
        <Input label="Senha" name="password" type="password" placeholder="Insira o sua senha" />

        <SubmitButton isSubmitting={isPending} />
      </form>
    </FormProvider>
  );
}