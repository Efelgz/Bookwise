import { useNavigate } from 'react-router-dom';
import { FaBook, FaPlus, FaChartBar, FaEdit } from 'react-icons/fa';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleStart = () => {
    navigate('/books');
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse takip eden glow efekti */}
      <div 
        className="pointer-events-none fixed w-96 h-96 rounded-full opacity-30 blur-3xl transition-all duration-100 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, rgba(59,130,246,0.2) 40%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      
      {/* Arka plan efekti */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo ve başlık */}
        <div className="text-center mb-8">
          <FaBook className="text-8xl text-cyan-400 mb-6 mx-auto" />
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-sky-500 mb-4">
            Bookwise
          </h1>
          <p className="text-xl text-cyan-200 max-w-md mx-auto">
            Okuduğunuz kitapları takip edin, okuma hızınızı ölçün
          </p>
        </div>

        {/* Özellikler */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <FaPlus className="text-4xl mb-3 text-cyan-400 mx-auto group-hover:scale-125 group-hover:rotate-90 transition-all duration-300" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">Kitap Ekle</h3>
            <p className="text-cyan-200 text-sm">Okuduğunuz kitapları kolayca ekleyin</p>
          </div>
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <FaChartBar className="text-4xl mb-3 text-cyan-400 mx-auto group-hover:scale-125 transition-all duration-300" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">İstatistikler</h3>
            <p className="text-cyan-200 text-sm">Günlük okuma hızınızı görün</p>
          </div>
          <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer">
            <FaEdit className="text-4xl mb-3 text-cyan-400 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-cyan-300 transition-colors">Düzenle</h3>
            <p className="text-cyan-200 text-sm">Kitap bilgilerini güncelleyin</p>
          </div>
        </div>

        {/* Başla butonu */}
        <button 
          onClick={handleStart}
          className="group relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-xl text-white shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110"
        >
          <span className="relative z-10">Başla </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </button>

        
      </div>
    </div>
  );
}

export default Home;