import { useState } from 'react';
import { Link } from 'react-router';
import { LogOut, Search } from 'lucide-react';

import { useAuthStore } from '@/features/auth/store';
import { useLogoutMutation } from '@/features/auth/queries';
import Logo from '@/components/logo';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-18 bg-gray-50 dark:bg-linear-to-br dark:from-[#0F172B] dark:to-[#070B14]">
      <Navbar />
      <main className="w-full max-w-2xl flex flex-col items-center pt-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated } = useAuthStore();
  const logout = useLogoutMutation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando por:', searchQuery);
    }
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-18 px-8 lg:px-0">
          <div className="w-full">
            <Link to="/" className="text-lg font-bold text-sky-500 hover:text-sky-700 transition">
              <Logo size="sm" />
            </Link>
          </div>

          {isAuthenticated ? (
            <>
              <div className="flex-1 min-w-xl">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por post..."
                    className="
                      w-full h-10 pl-11 text-sm
                      bg-white border border-gray-300 
                      rounded-md text-gray-900 
                      placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                      transition
                    "
                  />
                </form>
              </div>

              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="
                    p-2 rounded-full text-white bg-sky-500
                    hover:bg-sky-600 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transition
                  "
                  aria-label="Sair"
                  onClick={handleLogout}
                  disabled={logout.isPending}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-end gap-3">
              <Link
                to="/auth?mode=register"
                className="
                  border
                  px-4 py-2 text-sm font-medium
                  bg-gray-200 text-gray-900
                  hover:bg-gray-300
                  focus:ring-gray-400
                  rounded-full
                  transition
                  dark:bg-gray-800
                  dark:border-gray-700
                  dark:text-white
                "
              >
                Registra-se
              </Link>
              <Link
                to="/auth?mode=login"
                className="
                  px-4 py-2 text-sm font-medium
                  text-white bg-sky-500
                  rounded-full hover:bg-sky-600
                  transition
                "
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="w-full bottom-0 left-0 right-0 bg-white border-gray-200 z-50">
      <div className="w-full max-w-7xl mx-auto h-18 px-8 lg:px-0 flex items-center justify-start">
        <Logo size="sm" />
      </div>
    </footer>
  );
}

export { Navbar, Footer };
