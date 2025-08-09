import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Lock, Unlock, Image, X, Upload, AlertTriangle } from 'lucide-react';
import { QnaService } from '../services/QnaService';
import { toast } from 'react-toastify';
import { AuthService } from '../services/AuthService';

const baseUrl = process.env.REACT_APP_API_DOMAIN_URL; // 환경 변수 사용

export default function CreateQna() {
  const { id } = useParams(); // 수정 모드인 경우 ID가 있음
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef(null);
  const user = AuthService.getCurrentUser(); // Get current user

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    imageData: null
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(null);

  // 카테고리 옵션
  const categoryOptions = [
    { value: 'account', label: '계정 문의' },
    { value: 'payment', label: '결제 문의' },
    { value: 'service', label: '서비스 이용 문의' },
    { value: 'suggestion', label: '건의사항' },
    { value: 'bug', label: '오류 신고' },
    { value: 'other', label: '기타 문의' }
  ];

  // 수정 모드인 경우 기존 문의사항 데이터 불러오기
  useEffect(() => {
    if (isEditMode) {
      const fetchInquiry = async () => {
        try {
          setLoading(true);
          const response = await QnaService.getInquiryById(id);
          
          if (response.success) {
            const inquiryData = response.data;
            setFormData({
              title: inquiryData.title,
              content: inquiryData.content,
              category: inquiryData.category,
              imageData: null // 기존 이미지는 URL로만 관리
            });
            
            // 이미지가 있으면 미리보기 설정
            if (inquiryData.image_url) {
              // CloudFront URL인 경우 그대로 사용, 아니면 기존 로직 유지
              if (inquiryData.image_url.includes('cloudfront.net')) {
                setImagePreview(inquiryData.image_url);
              } else {
                const imageUrl = inquiryData.image_url.startsWith('http')
                  ? inquiryData.image_url
                  : `${baseUrl}${inquiryData.image_url}`;
                setImagePreview(imageUrl);
              }
            }
          } else {
            setError(response.error || '문의사항을 불러오는데 실패했습니다.');
          }
        } catch (err) {
          setError('문의사항을 불러오는데 실패했습니다.');
          console.error('문의사항 로딩 오류:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchInquiry();
    }
  }, [id, isEditMode]);

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
          from: isEditMode ? `/inquiries/${id}/edit` : '/inquiries/new',
          message: '문의사항을 작성하려면 로그인이 필요합니다.'
        } 
      });
      return;
    }*/

    // 수정 모드인 경우 기존 문의사항 로드
    if (isEditMode) {
      // ...existing code for fetching inquiry data...
    }
  }, [id, isEditMode, navigate]);

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 이미지 파일 선택 핸들러
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImageError(null);
    
    if (!file) {
      return;
    }
    
    // 파일 타입 검증
    if (!file.type.match('image.*')) {
      setImageError('이미지 파일만 업로드 가능합니다.');
      return;
    }
    
    // 파일 크기 검증 (5MB 제한)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('이미지 크기는 5MB를 초과할 수 없습니다.');
      return;
    }
    
    // 파일을 Base64로 변환
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
      setFormData(prev => ({
        ...prev,
        imageData: event.target.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // 이미지 삭제 핸들러
  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      imageData: '' // 빈 문자열로 설정하여 서버에서 이미지 삭제 처리
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 URL 유효성 검사 및 변환 함수
  const getImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${baseUrl}${url}`; // 환경 변수 baseUrl 사용
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 폼 검증
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    
    if (!formData.category) {
      setError('카테고리를 선택해주세요.');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      let response;
      
      if (isEditMode) {
        // 수정 모드
        response = await QnaService.updateInquiry(id, formData);
      } else {
        // 생성 모드
        response = await QnaService.createInquiry(formData);
      }
      
      if (response.success) {
        toast.success(isEditMode ? '문의사항이 수정되었습니다.' : '문의사항이 등록되었습니다.');
        navigate('/qna');
      } else {
        setError(response.error || '저장에 실패했습니다.');
      }
    } catch (err) {
      setError('저장 중 오류가 발생했습니다.');
      console.error('문의사항 저장 오류:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // 로그인하지 않은 경우 아무것도 렌더링하지 않음 (리다이렉트 처리 중)
  /*if (!user) {
    return null;
  }*/

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/qna')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? '문의사항 수정' : '새 문의하기'}
          </h1>
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 dark:hover:bg-blue-700 dark:disabled:bg-blue-800 dark:disabled:text-blue-300"
        >
          <Save size={16} />
          <span>{submitting ? '저장 중...' : '저장'}</span>
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            카테고리 <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">카테고리 선택</option>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            제목 <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="문의 제목을 입력하세요"
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            내용 <span className="text-red-500 dark:text-red-400">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="문의 내용을 상세히 작성해주세요."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            이미지 첨부
          </label>
          {imagePreview ? (
            <div className="relative border dark:border-gray-600 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="첨부 이미지" 
                className="max-h-72 max-w-full mx-auto"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 dark:hover:bg-red-700"
              >
                <X size={16} />
              </button>
              {/* CloudFront URL 표시 (개발 디버깅 용) */}
              {imagePreview && imagePreview.includes('cloudfront.net') && (
                <div className="absolute top-2 left-2 bg-blue-500 bg-opacity-70 text-white text-xs py-1 px-2 rounded">
                  CDN
                </div>
              )}
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">클릭하여 이미지 선택</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, GIF 최대 5MB</p>
              </div>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
            accept="image/*"
          />
          
          {imageError && (
            <div className="mt-2 flex items-center text-sm text-red-500 dark:text-red-400">
              <AlertTriangle size={16} className="mr-1" />
              {imageError}
            </div>
          )}
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300">
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">문의 전 알아두세요</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>문의사항은 영업일 기준 24시간 이내에 답변해드립니다.</li>
            <li>모든 문의사항은 본인과 관리자만 볼 수 있습니다.</li>
            <li>욕설, 비방, 광고 등의 내용이 포함된 문의는 삭제될 수 있습니다.</li>
            <li>등록한 문의는 수정이 가능하나, 답변이 있는 경우 내용을 수정할 수 없습니다.</li>
            <li>원활한 해결을 위해 문제 상황을 캡처한 이미지를 첨부해주시면 도움이 됩니다.</li>
          </ul>
        </div>
      </form>
    </div>
  );
}