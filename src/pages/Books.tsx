import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/bookService';
import type { IBook } from '../interfaces/IBook';

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<IBook[]>([]);

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
    <div className="min-h-screen bg-gray-100">
      {/* Üst Bar */}
      <div className="bg-indigo-900 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1
          onClick={() => navigate('/')}
          className="text-2xl font-bold cursor-pointer hover:text-purple-200"
          >
            📚 Bookwise
        </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg"
          >
            Ana Sayfa
          </button>
        </div>
      </div>

      {/* İçerik */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Kitap Listesi</h2>
          <button
            onClick={() => navigate('/books/add')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Yeni Kitap Ekle
          </button>
        </div>

        {/* Kitap Listesi */}
        {books.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              Henüz kitap eklenmedi. Hemen bir kitap ekleyin!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-1">✍️ {book.author}</p>
                <p className="text-gray-600 mb-1">📖 {book.genre}</p>
                <p className="text-gray-600 mb-1">📄 {book.totalPages} sayfa</p>
                <p className="text-gray-600 mb-1">📅 {book.startDate} - {book.endDate}</p>
                <p className="text-indigo-600 font-semibold mb-4">
                  ⚡ Günde {calculateDailyPages(book)} sayfa
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
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