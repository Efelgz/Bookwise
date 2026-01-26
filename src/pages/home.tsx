import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const handleStart = () => {
        navigate("/books");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from -indigo-900 via-purple-900 to-pink-800">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Bookwise
                    </h1>
                    <p className="text-xl text-purple-200 mb-8">
                        Kitap yönetim uygulaması
                    </p>
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
                    <p className="text-white mb-6">
                        Crud işlemleri ile kitaplarınızı yönetin
                    </p>
                    <button onClick={handleStart} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                        Başla
                    </button>
                    </div>
            </div>
        </div>
    </div>
    );
}
export default Home;