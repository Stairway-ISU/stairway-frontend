import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sale from './pages/Sale';
import Recommand from './pages/Recommand';
import Product from './pages/Product';
import Login from './pages/Login';
import Register from './pages/Register';
import Qna from './pages/Qna';
import Notice from './pages/Notice';
import CreateQna from './pages/CreateQna';
import ShoppingCart from './pages/ShoppingCart';
import QnaDetail from './pages/QnaDetail';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/recommand" element={<Recommand />} />
            <Route path="/product" element={<Product />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/qna" element={<Qna />} />
            <Route path="/createqna" element={<CreateQna />} />
            <Route path="/qnadetail" element={<QnaDetail />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;