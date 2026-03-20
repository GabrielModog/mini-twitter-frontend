import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

export default function Composer() {
  const [text, setText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) return;

    setIsPosting(true);
    try {
      console.log('Postando:', text);
      await new Promise(resolve => setTimeout(resolve, 1200));

      setText('');
      alert('Post publicado! (simulado)');
    } catch (error) {
      console.error('Erro ao postar:', error);
      alert('Erro ao postar. Tente novamente.');
    } finally {
      setIsPosting(false);
    }
  };

  const isButtonDisabled = !text.trim() || isPosting;

  return (
    <div className="w-160 min-height-40.6 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-200">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="E aí, o que está rolando?"
        rows={3}
        className="
          w-full px-6 pt-6 
          text-gray-900 placeholder-gray-500 
          bg-transparent border-none 
          focus:outline-none focus:ring-0 
          resize-none text-lg
        "
      />

      <div className="px-4">
        <div className="border-t border-gray-200" />
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-3">
        <button
          type="button"
          className="
            rounded-full 
            text-sky-500 hover:bg-sky-50 
            transition focus:outline-none focus:ring-2 focus:ring-sky-300
          "
          aria-label="Adicionar imagem"
          disabled={isButtonDisabled || isPosting}
        >
          <ImageIcon strokeWidth={1.5} className="h-8 w-8" />
        </button>

        <button
          onClick={handlePost}
          disabled={isButtonDisabled}
          className={`
            h-8.25 px-6 text-sm font-bold
            bg-sky-500 text-white
            rounded-full 
            hover:bg-sky-600 
            focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2
            transition disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm
          `}
        >
          {isPosting ? 'Postando...' : 'Postar'}
        </button>
      </div>
    </div>
  );
}