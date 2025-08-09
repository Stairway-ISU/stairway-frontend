import { Link } from "react-router-dom"

export default function Footer() {
  return (<footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-6 sm:mb-0">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">Stair</Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              모든 쇼핑을 Stair에서
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/sale" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    세일
                  </Link>
                </li>
                <li>
                  <Link to="/recommand" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    추천
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    상품
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">정보</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/notice" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    공지사항
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">지원</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/qna" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    문의하기
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-8 flex flex-wrap justify-center space-x-4">
          <Link to="/terms" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
            이용약관
          </Link>
          <Link to="/privacy" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
            개인정보취급방침
          </Link>
          <Link to="/operation-policy" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
            운영정책
          </Link>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-8 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Stair. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>)
}