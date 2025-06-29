import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const Home = () => {
  // 페이지 입장 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-x-hidden">
      <div className="max-w-[1152px] mx-auto px-4 pt-8 pb-12">
      </div>
    </div>
  );
};

export default Home;