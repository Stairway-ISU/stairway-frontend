import React, { useState, useEffect } from 'react';
import { Plus, Search, ChevronRight, Image, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { QnaService } from '../services/QnaService';
import Pagination from '../common/Pagination';
import { format } from 'date-fns';

export default function Qna() {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0
    });
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    // 인증 확인 및 리디렉션 추가
    useEffect(() => {
    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    /*if (!user) {
        console.log('로그인되지 않음, 로그인 모달 표시 필요');
        // 홈으로 이동하면서 로그인 모달을 표시하도록 상태 전달
        navigate('/', { 
            state: {
                showLoginModal: true,
                from: '/qna',
                message: '문의사항 페이지에 접근하려면 로그인이 필요합니다.'
            } 
        });
        return;
    }*/

    // 인증된 사용자만 문의사항 로드
    loadQna(currentPage);
    }, [navigate]);

    // 문의사항 목록 불러오기
    const loadQna = async (page = 1) => {
        try {
            setIsLoading(true);
            console.log(`페이지 ${page} 문의사항 로드 중...`);
            const response = await QnaService.getMyInquiries(page, 10);
      
            if (response.success) {
                // 서버 응답 구조 디버깅
                console.log('서버 응답 구조:', JSON.stringify(response, null, 2));
        
                // 문의사항 데이터 추출
                let inquiriesList = [];
                if (Array.isArray(response.data)) {
                    inquiriesList = response.data;
                } else if (response.data && Array.isArray(response.data.data)) {
                    inquiriesList = response.data.data;
                } else if (response.data && typeof response.data === 'object') {
                    inquiriesList = [response.data];
                }
        
                console.log(`${inquiriesList.length}개의 문의사항 로드됨`);
        
                // 페이지네이션 정보 추출
                let paginationInfo = {};
        
                if (response.pagination) {
                    paginationInfo = response.pagination;
                } else if (response.data && response.data.pagination) {
                    paginationInfo = response.data.pagination;
                }
        
                console.log('페이지네이션 정보:', paginationInfo);
        
                // 상태 업데이트 - snake_case에서 camelCase로 변환하여 올바른 값을 사용
                setInquiries(inquiriesList);
                setPagination({
                    currentPage: page,
                    totalPages: paginationInfo.total_pages || Math.ceil((paginationInfo.total_items || 0) / 10) || 1,
                    totalItems: paginationInfo.total_items || inquiriesList.length
                });
        
                console.log(`페이지네이션 설정: 현재 페이지=${page}, 전체 페이지=${paginationInfo.total_pages || 1}, 전체 항목=${paginationInfo.total_items || inquiriesList.length}`);
            } else {
                throw new Error(response.error || '문의사항을 불러오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('문의사항 목록 로드 실패:', error);
            /* toast.error('문의사항을 불러오는데 실패했습니다.'); */
            setInquiries([]);
            setPagination({
                currentPage: 1,
                totalPages: 1,
                totalItems: 0
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 변경시 데이터 다시 로드
    useEffect(() => {
        loadQna(currentPage);
        console.log(`현재 페이지 변경: ${currentPage}`);
    }, [currentPage]);

    // 검색어를 포함하는 문의사항만 필터링
    const filteredInquiries = Array.isArray(inquiries) ? inquiries.filter(inquiry => 
        inquiry.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.content?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        console.log(`페이지 ${newPage}(으)로 이동`);
        setCurrentPage(newPage);
        // 페이지 변경 시 UI 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectInquiry = (inquiry) => {
        navigate(`/inquiries/${inquiry.inquiry_id}`);
    };

    // 페이지네이션 표시 계산 부분 수정
    const totalItems = pagination.totalItems || 0; // 기본값 설정
    const pageSize = 10; // 페이지당 항목 수 명시적으로 정의
  
    // NaN 방지를 위한 안전한 계산
    const showingFrom = Math.max(((pagination.currentPage - 1) * pageSize) + 1, 1);
    const showingTo = Math.min(showingFrom + filteredInquiries.length - 1, totalItems || 0);

    // 로그인하지 않은 경우 아무것도 렌더링하지 않음 (리다이렉트 처리 중)
    /*if (!user) {
        return null;
    }*/

    return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">내 문의사항</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    총 {totalItems}개의 문의사항이 있습니다
                </p>
            </div>
            <button
            onClick={() => navigate('/createqna')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700"
            >
                <Plus className="w-4 h-4" />
                <span>새 문의하기</span>
            </button>
        </div>
        
        {/* 검색창 */}
        <div className="mb-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                type="text"
                placeholder="제목, 내용으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
            </div>
        </div>
        
        {/* 문의사항 목록 */}
        {isLoading ? (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">문의사항을 불러오는 중...</p>
            </div>
            ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm 
                    ? '검색 결과가 없습니다.' 
                    : '아직 문의사항이 없습니다. 새 문의를 작성해보세요!'}
                </p>
            </div>
        ) : (
        <div className="space-y-4">
            {filteredInquiries.map(inquiry => (
                <QnaItem
                key={inquiry.inquiry_id}
                inquiry={inquiry}
                onClick={() => handleSelectInquiry(inquiry)}
            />
            ))}
            </div>
        )}
        
        {/* 페이지네이션 */}
        {!isLoading && filteredInquiries.length > 0 && (
            <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalItems={pagination.totalItems}
            />
        )}
    </div>
    );
}

// 문의사항 아이템 컴포넌트
const QnaItem = ({ inquiry, onClick }) => {
  // 이미지 첨부 여부 표시
  const hasImage = !!inquiry.image_url;
  const isCloudFrontImage = hasImage && inquiry.image_url.includes('cloudfront.net');
  
  return (
    <div 
      className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-gray-800"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <QnaCategoryBadge category={inquiry.category} />
            {/* 이미지 첨부 표시 */}
            {hasImage && (
              <span className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                <Image size={12} />
                <span>이미지{isCloudFrontImage ? '' : ''}</span>
              </span>
            )}
          </div>
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{inquiry.title}</h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{format(new Date(inquiry.created_at), 'yyyy.MM.dd')}</span>
            <QnaStatusBadge status={inquiry.status} />
            <span className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{inquiry.reply_count || 0}</span>
            </span>
          </div>
        </div>
        <ChevronRight className="text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
};

// 문의사항 상태 컴포넌트
const QnaStatusBadge = ({ status }) => {
  const badges = {
    pending: {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-300',
      label: '접수'
    },
    in_progress: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      label: '처리중'
    },
    completed: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      label: '완료'
    }
  };

  const badge = badges[status] || badges.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
      {badge.label}
    </span>
  );
};

// 문의사항 카테고리 컴포넌트
const QnaCategoryBadge = ({ category }) => {
  const categories = {
    'account': {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-800 dark:text-purple-300',
      label: '계정'
    },
    'payment': {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      label: '결제'
    },
    'service': {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      label: '서비스'
    },
    'suggestion': {
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-800 dark:text-indigo-300',
      label: '건의사항'
    },
    'bug': {
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      label: '오류'
    },
    'other': {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-800 dark:text-gray-300',
      label: '기타'
    }
  };

  const badge = categories[category] || categories.other;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
      {badge.label}
    </span>
  );
};