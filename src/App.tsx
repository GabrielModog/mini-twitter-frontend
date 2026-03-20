import { BrowserRouter, Route, Routes } from 'react-router'

import AuthPage from './features/auth/pages/auth-page'
import PostsPage from './features/posts/pages/posts-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
