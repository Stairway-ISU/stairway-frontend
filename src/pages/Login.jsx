import { Link } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import { authService } from "../services/AuthService";

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,13}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      authService.login(id, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
    console.log("submit id: " + id + ", password: " + password);
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">로그인</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600">아이디</label>
            <input
              type="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">패스워드</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="패스워드를 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            {!isValidPassword && password && (
              <p className="text-red-600 text-sm mt-2">
                패스워드는 8~13자, 영문/숫자/특수문자를 포함해야 합니다.
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValidPassword}
            className={`w-full py-2 rounded-md transition ${
              isValidPassword
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
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