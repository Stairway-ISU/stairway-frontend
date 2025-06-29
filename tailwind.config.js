/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // 다크모드 색상 재정의
      },
      // 다크모드용 배경 색상 재정의
      backgroundColor: theme => ({
        ...theme('colors'),
        // 다크모드에서 사용할 색상 오버라이드
      }),
    },
  },
  plugins: [
    // 다크모드 배경색을 전역 설정하는 플러그인 추가
    function({ addBase, theme }) {
      addBase({
        '.dark': {
          backgroundColor: '#000000',
          color: theme('colors.white')
        },
      })
    }
  ],
}