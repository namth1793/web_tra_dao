import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/san-pham/:id" element={<ProductDetail />} />
        <Route path="/bai-viet" element={<Blog />} />
        <Route path="/bai-viet/:slug" element={<BlogDetail />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/lien-he" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
