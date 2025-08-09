import axios from "axios";

export const AuthService = {
  // 로그인
  login: async (id, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        id,
        password
      });
  
      if (response.success && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response;
    } catch (error) {
      console.error('Login error details:', error);
      throw error; 
    }
  },
  // 회원가입
  register: async (id, password) => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        id,
        password
      });

      return response;
    } catch (error) {
      throw new Error(error.response?.data?.error || '회원가입 중 오류가 발생했습니다.');
    }
  },
  // 현재 로그인한 사용자 정보 가져오기
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('사용자 정보 조회 중 오류 발생:', error);
      return null;
    }
  }
}