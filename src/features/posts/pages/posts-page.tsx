import Composer from "@/features/posts/components/composer"
import Navbar from "@/features/posts/components/navbar"
import PostCard from "@/features/posts/components/post-card"

export default function PostsPage() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-24 bg-gray-50">
      <Navbar />
      <div className="w-full max-w-2xl flex flex-col items-center h-186.25 pt-4">
        <Composer />

        <div className="flex flex-col gap-8 mt-8 pb-10">
          <PostCard
            author={{ name: "Lucas Costa", username: "lucascosta" }}
            date="15/02/2026"
            title="Iniciando um novo processo seletivo!🚀"
            content={`Really excited to share what we've been working on. The team has put in countless hours to make this seamless. Check out the screenshot below!\n#product #launch`}
            imageUrl="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop"
          />

          <PostCard
            author={{ name: "Modog", username: "modog__" }}
            date="20/03/2026"
            title="AOSKDPOSAKD"
            content="Testando o feed novo do Mini Twitter. Tá ficando show! 🔥"
            likes={47}
            liked={true}
          />
        </div>
      </div>
    </div>
  )
}