// Pagination.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, showingFrom, showingTo, totalItems }) => {
  // 아무 데이터가 없는 경우 처리
  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center text-sm text-gray-500">
        <p>데이터가 없습니다</p>
      </div>
    );
  }

  // 페이지 번호 배열 생성 (최대 5개)
  const generatePageNumbers = () => {
    const pages = [];
    
    // 총 페이지가 5보다 작거나 같은 경우 모든 페이지 표시
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } 
    // 총 페이지가 5보다 큰 경우 현재 페이지 주변 페이지만 표시
    else {
      // 현재 페이지가 1, 2인 경우 1~5 표시
      if (currentPage <= 2) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } 
      // 현재 페이지가 마지막, 마지막-1인 경우 마지막-4 ~ 마지막 표시
      else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } 
      // 그 외 경우 현재 페이지 중심으로 -2, +2 표시
      else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };
  
  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 아이템 표시 정보 */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        전체 {totalItems.toLocaleString()}개 중 {showingFrom.toLocaleString()}-{showingTo.toLocaleString()}
      </p>
      
      {/* 페이지 버튼 */}
      <div className="flex items-center space-x-1">
        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-md ${
            currentPage === 1 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* 페이지 번호 버튼 */}
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-md ${
            currentPage === totalPages 
              ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;