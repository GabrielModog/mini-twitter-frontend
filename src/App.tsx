import { BrowserRouter, Route, Routes } from 'react-router'

import AuthPage from './features/auth/pages/auth-page'
import PostsPage from './features/posts/pages/posts-page'
import { ToastProvider } from './contexts/toast-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import ProtectedRoute from './components/protected-router'

function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/posts" element={<PostsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ToastProvider>
  )
}

export default App
