import Footer from './components/footer';
import Navbar from './components/navbar';

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
