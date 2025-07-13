import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();

  const navItem = (to, label) => {
    const isActive = pathname === to;

    return (
      <Link
        to={to}
        className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition"
      >
        {label}
        <span
          className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
            isActive ? "w-8 bg-blue-600" : "w-0 bg-transparent"
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
          <h1 className="text-2xl font-bold text-blue-600">MyApp</h1>
          <nav className="flex space-x-4 relative">
            {navItem("/", "Home")}
            {navItem("/about", "About")}
            {navItem("/contact", "Contact")}
          </nav>
        </div>

        {/* 오른쪽: 로그인 버튼 */}
        <div>
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
}