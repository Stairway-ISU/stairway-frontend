// contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// 테마 컨텍스트 생성
const ThemeContext = createContext();

// 테마 공급자 컴포넌트
export const ThemeProvider = ({ children }) => {
  // 초기 테마 상태 설정 (로컬 스토리지에서 로드하거나 시스템 설정 사용)
  const [darkMode, setDarkMode] = useState(() => {
    // 로컬 스토리지에서 테마 설정 확인
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // 시스템 설정 확인
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 다크모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // 특정 테마로 직접 설정하는 함수 추가
  const setThemeMode = (isDark) => {
    setDarkMode(isDark);
  };

  // 테마 변경 시 HTML 요소에 'dark' 클래스 추가/제거 및 로컬 스토리지 업데이트
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // 사용자가 직접 테마를 설정하지 않은 경우에만 시스템 설정 따름
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 컨텍스트 값 제공
  const value = {
    darkMode,
    toggleDarkMode,
    setThemeMode // 새 함수 추가
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// 커스텀 훅으로 테마 컨텍스트 사용 간소화
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;