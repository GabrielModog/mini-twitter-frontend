import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/lib/api-client";
import { usePostsStore } from "./store";

import type { CreatePostPayload, IPost, LikeResponse, PostDataResponse } from "./types";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const addPost = usePostsStore((state) => state.addPost);

  return useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
      const response = await apiClient.post<IPost>("/posts", payload);
      return response.data;
    },
    onSuccess: (newPost) => {
      addPost(newPost);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const removePost = usePostsStore((state) => state.removePost);

  return useMutation({
    mutationFn: async (postId: number) => {
      await apiClient.delete(`/posts/${postId}`);
    },
    onSuccess: (_, postId) => {
      removePost(postId);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function usePosts(search?: string) {
  const prevPosts = usePostsStore((state) => state.posts)
  const setPosts = usePostsStore((state) => state.setPosts);
  return useInfiniteQuery({
    queryKey: ["posts", search],
    initialPageParam: 1,
    queryFn: async (data) => {
      const params = new URLSearchParams();
      params.append("page", String(data.pageParam))
      if (search) params.append("search", search);
      const response = await apiClient.get<PostDataResponse>("/posts", { params });
      setPosts([...prevPosts, ...response.data.posts])
      return response.data;
    },
    getNextPageParam: (data) => {
      const { page, limit, total } = data
      if (page * limit < total) return page + 1
      return undefined
    },
  });
}

export function useLikePost() {
  const updatePost = usePostsStore((state) => state.updatePost);

  return useMutation({
    mutationFn: async (postId: number): Promise<LikeResponse> => {
      const response = await apiClient.post<LikeResponse>(`/posts/${postId}/like`);
      return response.data;
    },
    onSuccess: (data, postId) => {
      updatePost(postId, { likesCount: data.likes });
    },
  });
}
