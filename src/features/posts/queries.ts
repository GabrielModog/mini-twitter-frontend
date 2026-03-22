import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import apiClient from "@/lib/api-client";
import { usePostsStore } from "./store";

import type { CreatePostPayload, IPost, LikeResponse, PostDataResponse } from "./types";
import { useEffect } from "react";

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
  const setPosts = usePostsStore((state) => state.setPosts);
  const setPagination = usePostsStore((state) => state.setPagination)

  const query = useQuery({
    queryKey: ["posts", search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      const response = await apiClient.get<PostDataResponse>("/posts", { params });
      return response.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setPosts(query.data.posts);
      setPagination(query.data.limit, query.data.page, query.data.total)
    }
  }, [query.data, setPosts]);

  return query;
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
