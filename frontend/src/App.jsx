import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/san-pham/:id" element={<ProductDetail />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/bai-viet" element={<Blog />} />
          <Route path="/bai-viet/:slug" element={<BlogDetail />} />
          <Route path="/gioi-thieu" element={<About />} />
          <Route path="/lien-he" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
