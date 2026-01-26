import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Books from "./pages/Books";
import AddBook from "./pages/AddBook";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/books/add" element={<AddBook/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App
