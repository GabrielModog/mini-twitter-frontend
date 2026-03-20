import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}