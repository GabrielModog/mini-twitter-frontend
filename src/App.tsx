import { Route, Routes, useLocation } from 'react-router'

import AuthPage from './features/auth/pages/auth-page'
import PostsPage from './features/posts/pages/posts-page'

import ProtectedRoute from './components/protected-router'

function App() {
  const location = useLocation()
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/posts" element={<PostsPage key={location.search} />} />
      </Route>
    </Routes>
  )
}

export default App
