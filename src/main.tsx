import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'

import './index.css'

import App from './App.tsx'

import { ToastProvider } from './contexts/toast-context'
import { queryClient } from './lib/query-client'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ToastProvider>
  </StrictMode>,
)
