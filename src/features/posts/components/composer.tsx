import { useRef, useState } from 'react';
import { X as XIcon, Image as ImageIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Button from '@/components/button';
import { Textarea } from '@/components/textarea';

import { useCreatePost } from '@/features/posts/queries';
import { postFormSchema } from '@/features/posts/schemas';
import type { PostFormType } from '@/features/posts/types';
import { useToast } from '@/contexts/toast-context';
import { getApiError } from '@/lib/api-client';
import { Input } from '@/components/input';
import { useAuthStore } from '@/features/auth/store';

export default function Composer() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const { showToast } = useToast();
  const createPost = useCreatePost();

  const fileInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)

  const [isExpanded, setIsExpanded] = useState(false)

  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm<PostFormType>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      image: null,
    },
  })

  const titleValue = watch("title")
  const textValue = watch("content")
  const imageValue = watch("image")
  const hasContent = titleValue?.trim() || textValue?.trim()
  const isButtonDisabled = !textValue?.trim() || createPost.isPending

  const handleImageClick = () => {
    fileInputRef.current?.click()
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setValue("image", reader.result as string)
      };
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setValue("image", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
    setTimeout(() => {
      titleInputRef.current?.focus()
    }, 0)
  }

  const handleBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement | null
    if (!relatedTarget?.closest('form')) {
      if (!hasContent && !imageValue) {
        setIsExpanded(false)
        reset({ title: "", content: "", image: null })
      }
    }
  }

  function onSubmit(data: PostFormType) {
    createPost.mutate(
      { title: data.content, content: data.content, image: data.image ?? "" },
      {
        onSuccess: () => {
          showToast("Post criado!", "success")
          reset({ title: "", content: "", image: null })
          if (fileInputRef.current) {
            fileInputRef.current.value = ""
          }
        },
        onError: (error) => {
          const { message } = getApiError(error);
          showToast(message, "error")
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onBlur={handleBlur} className="w-160 min-height-40.6 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200">
      {!isExpanded ? (
        <div
          onClick={handleExpand}
          className="cursor-text"
        >
          <Textarea
            name="content"
            placeholder="E aí, o que está rolando?"
            register={register}
            rows={3}
          />
        </div>
      ) : (
        <>
          <Input
            name="title"
            type="text"
            placeholder="Título"
            register={register}
            error={errors.title?.message}
          />
          <Textarea
            name="content"
            placeholder="E aí, o que está rolando?"
            register={register}
            error={errors.content?.message}
            rows={3}
          />
        </>
      )}

      {imageValue && (
        <div className="px-4 pt-2 pb-2">
          <div className="relative inline-block">
            <img
              src={imageValue}
              alt="Preview"
              className="max-h-48 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              aria-label="Remover imagem"
            >
              <XIcon className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="px-4">
        <div className="border-t border-gray-200" />
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <button
          type="button"
          onClick={handleImageClick}
          disabled={!isAuthenticated}
          className="
            rounded-full 
            text-sky-500 hover:bg-sky-50 
            transition focus:outline-none focus:ring-2 focus:ring-sky-300
            disabled:opacity-50
          "
          aria-label="Adicionar imagem"
        >
          <ImageIcon strokeWidth={1.5} className="h-8 w-8" />
        </button>

        <Button
          type="submit"
          label="Postar"
          disabled={isButtonDisabled}
          loading={createPost.isPending}
          loadingMessage="Postando..."
          size="sm"
          variant="primary"
        />
      </div>
    </form>
  );
}