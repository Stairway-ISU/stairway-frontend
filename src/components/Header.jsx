import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa'; // 장바구니 아이콘

export default function Header() {
  const { pathname } = useLocation();

  const navItem = (to, label) => {
    return (
      <Link
        to={to}
        className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
      >
        {label}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
            pathname === to ? "w-8 bg-blue-600" : "w-0 bg-transparent"
          }`}
        />
      </Link>
    );
  };

  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* 왼쪽: 로고 + 메뉴 */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold hover:opacity-80">
            Stair
          </Link>
          <nav className="flex space-x-4 relative">
            {navItem("/sale", "세일")}
            {navItem("/recommand", "추천")}
            {navItem("/product", "상품")}
          </nav>
        </div>

        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/shoppingcart" className="hover:underline">
            장바구니
          </Link>
          <Link to="/login" className="hover:underline">
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}