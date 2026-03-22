import { create } from "zustand";
import type { IPost } from "./types";

interface PostsStore {
  posts: IPost[];
  limit: number, 
  page: number,
  total: number,
  setPosts: (posts: IPost[]) => void;
  addPost: (post: IPost) => void;
  updatePost: (id: number, updated: Partial<IPost>) => void;
  removePost: (id: number) => void;
  clearPosts: () => void;
  setPagination: (limit: number, page: number, total: number) => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  limit: 0,
  page: 0,
  total: 0,
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  updatePost: (id, updated) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    })),
  removePost: (id) =>
    set((state) => ({ posts: state.posts.filter((p) => p.id !== id) })),
  clearPosts: () => set({ posts: [] }),
  setPagination: (limit: number, page: number, total: number) =>  set({ limit, page, total }),
}));
