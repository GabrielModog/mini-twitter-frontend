import Composer from "../components/composer"
import Navbar from "../components/navbar"

export default function PostsPage() {

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
      <Navbar />
      <div className="w-full max-w-2xl flex flex-col items-center h-186.25 pt-4">
        <Composer />
      </div>
    </div>
  )
}