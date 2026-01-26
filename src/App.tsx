import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Books from "./pages/Books";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App
