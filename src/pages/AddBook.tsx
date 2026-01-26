import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../services/bookService";
function AddBook(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBook({
        title,
        author,
        genre,
        totalPages: Number(totalPages),
        startDate,
        endDate
    });
    navigate("/books");
};
    return ( 
    <div className="min-h-screen bg-gray-100">
        <div className="bg-indigo-900 text-white py-4 px-6">
            <div className="container mx-auto">
                <h1
                onClick={() => navigate('/')}
                className="text-2xl font-bold cursor-pointer hover:text-purple-200"
                >
                    📚 Bookwise
                </h1>
            </div>
        </div>
        { /*Form  */ }
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Yeni Kitap Ekle</h2>
                <form onSubmit={handleSubmit}>
                    {/* Kitap Adı */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Kitap Adı
                        </label>
                        <input
                        type = "text"
                        value={title}
                        onChange={(e)=> setTitle ( e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Kitap adını girin"
                        required
                        />
                    </div>
                    {/* Yazar */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Yazar
                        </label>
                        <input
                        type = "text"
                        value = {author}
                        onChange={(e)=> setAuthor(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Yazar Adını girin"
                        required
                        />
                    </div>
                    {/* Tür */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Tür
                        </label>
                        <input 
                        type = "text"
                        value = {genre}
                        onChange={(e)=> setGenre(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Örn: Roman, Bilim Kurgu, Tarih"
                        required
                        />
                        </div>
                        {/* Toplam Sayfa Sayısı */}
                        <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Toplam Sayfa Sayısı
                        </label>
                        <input 
                        type = "number"
                        value = {totalPages}
                        onChange={(e)=> setTotalPages(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Örn: 356"
                        required
                        />
                    </div>
                    {/* Başlangıç Tarihi */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Okumaya Başlama Tarihi
                        </label>
                        <input 
                        type = "date"
                        value = {startDate}
                        onChange={(e)=> setStartDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Örn: 2024-06-15"
                        required
                        />
                    </div>
                    {/* Bitiş Tarihi */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Bitiş Tarihi
                        </label>
                        <input 
                        type = "date"
                        value = {endDate}
                        onChange={(e)=> setEndDate(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Örn: 2024-06-19"
                        required
                        />
                        </div>
                    {/* Butonlar */}
                    <div className="flex gap-4">
                        <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg"
                        >
                            Kaydet
                        </button>
                        <button
                        type="button"
                        onClick={() => navigate("/books")}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg"
                        >
                        İptal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}

export default AddBook;