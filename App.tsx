
import React from 'react';
import ImageEditor from './components/ImageEditor';

function App() {
  return (
    <div className="min-h-screen bg-[#2d5c67] text-gray-100 font-sans">
      <header className="bg-black bg-opacity-20 backdrop-blur-sm p-4 shadow-lg">
        <div className="container mx-auto flex items-center gap-4">
           <svg
            className="w-8 h-8 text-[#f0e6b6]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.645 2.007a1 1 0 0 1 1.71 0l1.458 2.655a1 1 0 0 0 .855.546l2.922.425a1 1 0 0 1 .554 1.705l-2.113 2.06a1 1 0 0 0-.288.885l.5 2.91a1 1 0 0 1-1.451 1.054L12.5 12.65a1 1 0 0 0-.93 0l-2.614 1.375a1 1 0 0 1-1.45-1.054l.5-2.91a1 1 0 0 0-.288-.885l-2.113-2.06a1 1 0 0 1 .554-1.705l2.922-.425a1 1 0 0 0 .855-.546L11.645 2.007Z" />
            <path d="m14.364 16.82-1.924 1.012a1 1 0 0 1-.93 0l-1.924-1.012a5.932 5.932 0 0 0-3.321 5.184 1 1 0 0 0 .998 1h8.52a1 1 0 0 0 .998-1 5.932 5.932 0 0 0-3.321-5.184Z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-wider text-[#f0e6b6]">Merch Mockup AI</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <ImageEditor />
      </main>
      <footer className="text-center p-4 text-xs text-gray-400">
        <p>Powered by Gemini. For promotional and conceptual use only.</p>
      </footer>
    </div>
  );
}

export default App;
