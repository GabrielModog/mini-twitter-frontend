import { Heart } from 'lucide-react'

import type { IPost } from '@/features/posts/types'
import { useLikePost } from '@/features/posts/queries';
import { formatDate } from '@/lib/date';
import { getApiError } from '@/lib/api-client';
import { useToast } from '@/contexts/toast-context';

interface PostCardProps extends IPost {}

export default function PostCard(props: PostCardProps) {
  const { id, authorId, authorName, createdAt, title, content, image, liked, likesCount } = props

  const likePost = useLikePost();
  const { showToast } = useToast()

  const handleLike = () => {
    likePost.mutate(id, {
      onError: (error) => {
        const { message } = getApiError(error);
        showToast(message, "error");
      },
    });
  };

  const hasLike = (liked || likesCount)
  const hasLikesCounts = (likesCount || 0) > 0 

  return (
    <article className="w-160 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      <div className="px-4 pt-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="font-bold text-gray-700 dark:text-white truncate">
              {authorName}
            </span>
            <span className="text-gray-500 truncate">
              @{authorId}
            </span>
            <span className="text-gray-500 dark:text-gray-600">·</span>
            <span className="text-gray-500 dark:text-gray-600">
              {formatDate(createdAt)}
            </span>
          </div>
          <h5 className="text-lg font-bold text-gray-700 dark:text-white">{title}</h5>
          <p className="mt-1 text-gray-700 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">
            {content}
          </p>

          {image && (
            <div className="max-h-50 mt-3 rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={image}
                alt="Post media"
                className="w-full h-auto object-cover max-h-125"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex mt-3 -ml-2">
            <button
              onClick={handleLike}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                hover:bg-red-50 transition-colors
                ${hasLike ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}
              `}
            >
              <Heart
                className="w-5 h-5"
                fill={liked ? 'currentColor' : 'none'}
              />
              {hasLikesCounts && (
                <span className="text-sm font-medium">{likesCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="h-2" />
    </article>
  )
}