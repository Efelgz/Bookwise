import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/bookService';
import type { IBook } from '../interfaces/IBook';
import { FaBook, FaPlus, FaHome, FaEdit, FaTrash } from 'react-icons/fa';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Sayfa yüklenince kitapları getir
  useEffect(() => {
    setBooks(getBooks());
  }, []);

  // Kitap silme fonksiyonu
  const handleDelete = (id: string) => {
    if (window.confirm('Bu kitabı silmek istediğinize emin misiniz?')) {
      deleteBook(id);
      setBooks(getBooks()); // Listeyi güncelle
    }
  };

  // Günde okunan sayfa hesaplama
  const calculateDailyPages = (book: IBook): number => {
    const start = new Date(book.startDate);
    const end = new Date(book.endDate);
    const days = Math.ceil((end.getTime() - start.getTime() + 1) / (1000 * 60 * 60 * 24));
    if (days <= 0) return book.totalPages;
    return Math.round(book.totalPages / days);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse takip eden glow efekti */}
      <div 
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-100 ease-out z-0"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Üst Bar - Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 relative z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate('/')}
            className="text-2xl font-bold cursor-pointer text-white hover:text-cyan-300 transition-colors flex items-center gap-2"
          >
            <FaBook className="text-cyan-400" />
            Bookwise
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2"
          >
            <FaHome />
            Ana Sayfa
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-4xl font-bold text-white">📚 Kitap Listesi</h2>
          <button
            onClick={() => navigate('/books/add')}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <FaPlus />
            Yeni Kitap Ekle
          </button>
        </div>

        {/* Kitap Listesi */}
        {books.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 text-center">
            <FaBook className="text-6xl text-cyan-300 mx-auto mb-4" />
            <p className="text-white/80 text-xl mb-6">
              Henüz kitap eklenmedi. Hemen bir kitap ekleyin!
            </p>
            <button
              onClick={() => navigate('/books/add')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              İlk Kitabını Ekle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group"
              >
                {/* Kitap Başlığı */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {book.title}
                </h3>
                
                {/* Kitap Bilgileri */}
                <div className="space-y-2 mb-4">
                  <p className="text-white/80 flex items-center gap-2">
                    <span className="text-cyan-400">✍️</span> {book.author}
                  </p>
                  <p className="text-white/80 flex items-center gap-2">
                    <span className="text-cyan-400">📖</span> {book.genre}
                  </p>
                  <p className="text-white/80 flex items-center gap-2">
                    <span className="text-cyan-400">📄</span> {book.totalPages} sayfa
                  </p>
                  <p className="text-white/80 flex items-center gap-2">
                    <span className="text-cyan-400">📅</span> {book.startDate} → {book.endDate}
                  </p>
                </div>

                {/* Günlük Sayfa - Vurgulu */}
                <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl p-3 mb-4 text-center">
                  <p className="text-white font-bold text-lg">
                    ⚡ Günde {calculateDailyPages(book)} sayfa
                  </p>
                </div>

                {/* Butonlar */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                    className="flex-1 bg-blue-500/80 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="flex-1 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaTrash />
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;