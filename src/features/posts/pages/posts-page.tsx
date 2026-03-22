import Composer from "@/features/posts/components/composer"
import { PostsFeed } from "../components/post-feed"
import { Layout } from "../layout";


export default function PostsPage() {
  return (
    <Layout>
      <Composer />
      <PostsFeed />
    </Layout>
  )
}
