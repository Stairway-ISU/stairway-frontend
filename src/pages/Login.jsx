import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">로그인</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">아이디</label>
            <input
              type="id"
              placeholder="아이디를 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">패스워드</label>
            <input
              type="password"
              placeholder="패스워드를 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            로그인
          </button>
        </form>

        {/* 회원가입 버튼 */}
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">계정이 없으신가요?</span>
          <Link
            to="/register"
            className="ml-2 text-blue-600 font-medium hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}