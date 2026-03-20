import { Heart } from 'lucide-react'
import { useState } from 'react'

interface PostProps {
  author: {
    name: string
    username: string
  }
  date: string
  title: string
  content: string
  imageUrl?: string
  likes?: number
  liked?: boolean
}

export default function PostCard({
  author,
  date,
  title,
  content,
  imageUrl,
  likes = 0,
  liked = false,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(liked)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  return (
    <div className="w-160 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 pt-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap text-sm">
            <span className="font-bold text-gray-700 truncate">
              {author.name}
            </span>
            <span className="text-gray-500 truncate">
              @{author.username}
            </span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {date}
            </span>
          </div>
          <h5 className="text-lg font-bold text-gray-700">{title}</h5>
          <p className="mt-1 text-gray-700 whitespace-pre-wrap leading-relaxed">
            {content}
          </p>

          {imageUrl && (
            <div className="max-h-50 mt-3 rounded-2xl overflow-hidden border border-gray-200">
              <img
                src={imageUrl}
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
                ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}
              `}
            >
              <Heart
                className="w-5 h-5"
                fill={isLiked ? 'currentColor' : 'none'}
              />
              {likeCount > 0 && (
                <span className="text-sm font-medium">{likeCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="h-2" />
    </div>
  )
}