import { usePosts } from "@/features/posts/queries";
import { usePostsStore } from "@/features/posts/store";

import PostCard from "./post-card";
import PostSkeleton from "./post-skeleton";

export function PostsFeed() {
  const posts = usePostsStore((state) => state.posts);
  const { isLoading, isError } = usePosts();

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

  return (
    <div className="flex flex-col gap-8 mt-8 pb-10">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
