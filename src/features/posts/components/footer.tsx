import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="w-full bottom-0 left-0 right-0 bg-white border-gray-200 z-50 dark:bg-transparent">
      <div className="w-full max-w-7xl mx-auto h-18 px-8 lg:px-0 flex items-center justify-start">
        <Logo size="sm" />
      </div>
    </footer>
  );
}
