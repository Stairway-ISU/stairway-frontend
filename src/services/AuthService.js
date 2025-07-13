import axios from "axios";

export const authService = {
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
  }
}