import { AuthService } from "../services/AuthService";
import React, {useState, useEffect} from 'react';

export default function Register() {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,13}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
    try {
      AuthService.register(id, password);
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">회원가입</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600">이름</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">아이디</label>
            <input
              type="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            {!isValidPassword && password && (
              <p className="text-red-600 text-sm mt-2">
                패스워드는 8~13자, 영문/숫자/특수문자를 포함해야 합니다.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-600">패스워드 확인</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="패스워드를 한번 더 입력하세요"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            {password != confirmPassword && (
              <p className="text-red-600 text-sm mt-2">
                패스워드가 같지 않습니다.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}