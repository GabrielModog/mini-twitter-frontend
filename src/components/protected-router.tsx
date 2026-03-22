import {  Outlet } from 'react-router';
import { useAuthStore } from '@/features/auth/store';

export default function ProtectedRoute() {
  const {  isLoading } = useAuthStore();

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  return <Outlet />;
}
