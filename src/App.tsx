import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/books/add" element={<AddBook/>}/>
        <Route path="/books/edit/:id" element={<EditBook/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App
