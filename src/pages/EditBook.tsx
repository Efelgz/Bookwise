import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookById, updateBook } from "../services/bookService";
import { FaBook, FaArrowLeft, FaSave, FaTimes, FaUser, FaEdit, FaLayerGroup, FaCalendarAlt } from "react-icons/fa";

function EditBook() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Kitap bilgilerini yükle
  useEffect(() => {
    if (id) {
      const book = getBookById(id);
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setTotalPages(String(book.totalPages));
        setStartDate(book.startDate);
        setEndDate(book.endDate);
      }
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateBook(id, {
        title,
        author,
        genre,
        totalPages: Number(totalPages),
        startDate,
        endDate
      });
      navigate("/books");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

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

      {/* Header - Glassmorphism */}
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
            onClick={() => navigate('/books')}
            className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2"
          >
            <FaArrowLeft />
            Geri Dön
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="container mx-auto px-4 py-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Form Card - Glassmorphism */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
              <FaEdit className="text-cyan-400" />
              Kitabı Düzenle
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kitap Adı */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <FaBook className="text-cyan-400" />
                  Kitap Adı
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Kitap adını girin"
                  required
                />
              </div>

              {/* Yazar */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <FaUser className="text-cyan-400" />
                  Yazar
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Yazar adını girin"
                  required
                />
              </div>

              {/* Tür */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  <FaLayerGroup className="text-cyan-400" />
                  Tür
                </label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Örn: Roman, Bilim Kurgu, Tarih"
                  required
                />
              </div>

              {/* Toplam Sayfa Sayısı */}
              <div>
                <label className="flex items-center gap-2 text-white font-semibold mb-2">
                  📄 Toplam Sayfa Sayısı
                </label>
                <input
                  type="number"
                  value={totalPages}
                  onChange={(e) => setTotalPages(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Örn: 356"
                  required
                />
              </div>

              {/* Tarihler - Yan Yana */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Başlangıç Tarihi */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FaCalendarAlt className="text-green-400" />
                    Başlama Tarihi
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                {/* Bitiş Tarihi */}
                <div>
                  <label className="flex items-center gap-2 text-white font-semibold mb-2">
                    <FaCalendarAlt className="text-orange-400" />
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Butonlar */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FaSave />
                  Güncelle
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/books")}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <FaTimes />
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBook;
