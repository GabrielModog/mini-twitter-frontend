import { z } from "zod"
import type { postFormSchema } from "./schemas"

export type PostFormType = z.infer<typeof postFormSchema>

export interface IPost {
  id: number
  authorId: number
  authorName: string
  content: string
  title: string
  createdAt: string
  image: string | null
  likesCount?: number
  liked?: boolean
}

export interface CreatePostPayload {
  content: string;
  image?: string | null;
  title?: string;
}

export interface LikeResponse {
  likes: number;
  liked: boolean;
}

export interface PostDataResponse {
  posts: IPost[]
  page: number
  limit: number
  total: number
}