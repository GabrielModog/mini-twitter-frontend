import { useEffect } from "react";
import { useInView } from "react-intersection-observer"

import { usePosts } from "@/features/posts/queries";
import { usePostsStore } from "@/features/posts/store";

import PostCard from "./post-card";
import PostSkeleton from "./post-skeleton";

export function PostsFeed() {
  const posts = usePostsStore((state) => state.posts);
  const { isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();

  const { ref: sentinelRef, inView } = useInView({
    threshold: 0,
    root: null,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 mt-8 pb-10">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  if (isError) {
    return null;
  }

  if (posts.length === 0 && !isFetchingNextPage) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <p className="text-lg">Nenhum post por enquanto...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-8 pb-10">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}

      <div ref={sentinelRef} className="h-px" />

      {isFetchingNextPage && <PostSkeleton />}
    </div>
  )
}
