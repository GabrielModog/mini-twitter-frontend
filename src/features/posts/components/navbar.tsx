import { useState } from 'react';
import { LogOut, Search } from 'lucide-react';
import Logo from '@/components/logo';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando por:', searchQuery);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-18 px-8 lg:px-0">
          <div className="w-full">
            <a href="/" className="text-lg font-bold text-sky-500 hover:sky-blue-700 transition">
              <Logo size="sm" />
            </a>
          </div>

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
                -scale-x-100
              "
              aria-label="Atualizar feed"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}