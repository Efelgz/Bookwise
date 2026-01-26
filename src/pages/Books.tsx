import { useNavigate } from "react-router-dom";
function Books(){
    const navigate = useNavigate();
    return(
        <div className="min-h-screen bg--gray100">
            {}
            <div className="bg-indigo-900 tezt-white py-4 px-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Bookwise</h1>
                    <button onClick={() => navigate('/')}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg"
                    >
                        Ana Sayfa
                    </button>
                </div>
            </div>
            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Kitap Listesi</h2>
                    <button
                    onClick={()=> navigate('/books/add')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                        Yeni Kitap Ekle
                    </button>
                </div>
                {/* Kitap Listesi */}
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <p className="text-gray-500 text-lg">
                        Henüz Kitap Eklenmedi. Hemen bir kitap ekleyin!
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Books;