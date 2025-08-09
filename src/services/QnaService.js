import axios from "axios";

export const QnaService = {
    // 내 문의사항 목록 조회
  getMyInquiries: async (page = 1, limit = 10) => {
    try {
      // 요청 URL에 실제 페이지와 개수 표시
      const url = `/v1/inquiries?page=${page}&limit=${limit}`;
      console.log(`문의사항 API 요청: ${url}`);
      
      // API 호출
      const response = await axios.get(url);
      
      // 응답 데이터 구조 디버깅 
      console.log(`문의사항 API 응답:`, {
        success: response.success,
        pagination: response.pagination || (response.data && response.data.pagination) || '없음',
        dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
        dataLength: Array.isArray(response.data) ? response.data.length : 'N/A'
      });
      
      return response;
    } catch (error) {
      console.error('문의사항 목록 조회 실패:', error);
      throw error;
    }
  },
  
  // 모든 문의사항 목록 조회 (관리자용)
  getAllInquiries: async (page = 1, limit = 10, status = null) => {
    try {
      // 상태 필터가 있으면 쿼리 파라미터에 추가
      let endpoint = `/v1/inquiries?page=${page}&limit=${limit}`;
      if (status && status !== 'all') {
        endpoint += `&status=${status}`;
      }
      
      const response = await axios.get(endpoint);
      return response;
    } catch (error) {
      console.error('문의사항 목록 조회 실패:', error);
      throw error;
    }
  },

   // 특정 상태의 문의사항 수 조회 (관리자용)
   getInquiriesCount: async () => {
    try {
      const response = await axios.get('/v1/inquiries/count');
      return response;
    } catch (error) {
      console.error('문의사항 수 조회 실패:', error);
      throw error;
    }
  },
  
  // 특정 문의사항 조회
  getInquiryById: async (inquiryId) => {
    try {
      const response = await axios.get(`/v1/inquiries/${inquiryId}`);
      return response;
    } catch (error) {
      console.error('문의사항 상세 조회 실패:', error);
      throw error;
    }
  },
  
  // 문의사항 작성 (이미지 포함)
  createInquiry: async (inquiryData) => {
    try {
      // isPrivate 값을 항상 true로 설정 (서버에서도 처리되지만 클라이언트에서도 명시적으로 처리)
      const dataToSend = {
        ...inquiryData,
        isPrivate: true
      };

      const response = await axios.post('/v1/inquiries', dataToSend);
      return response;
    } catch (error) {
      console.error('문의사항 작성 실패:', error);
      throw error;
    }
  },
  
  // 문의사항 수정 (이미지 포함)
  updateInquiry: async (inquiryId, inquiryData) => {
    try {
      // isPrivate 값을 항상 true로 설정
      const dataToSend = {
        ...inquiryData,
        isPrivate: true
      };

      const response = await axios.put(`/v1/inquiries/${inquiryId}`, dataToSend);
      return response;
    } catch (error) {
      console.error('문의사항 수정 실패:', error);
      throw error;
    }
  },
  
  // 문의사항 삭제
  deleteInquiry: async (inquiryId) => {
    try {
      const response = await axios.delete(`/v1/inquiries/${inquiryId}`);
      return response;
    } catch (error) {
      console.error('문의사항 삭제 실패:', error);
      throw error;
    }
  },
  
  // 문의사항 상태 업데이트 (관리자용)
  updateInquiryStatus: async (inquiryId, status) => {
    try {
      const response = await axios.put(`/v1/inquiries/${inquiryId}/status`, { status });
      return response;
    } catch (error) {
      console.error('문의사항 상태 업데이트 실패:', error);
      throw error;
    }
  },
  
  // 답변 작성 (이미지 포함)
  createReply: async (inquiryId, content, imageData = null) => {
    try {
      const response = await axios.post(`/v1/inquiries/${inquiryId}/replies`, { 
        content,
        imageData 
      });
      return response;
    } catch (error) {
      console.error('답변 작성 실패:', error);
      throw error;
    }
  },
  
  // 답변 수정
  updateReply: async (replyId, content, imageData = null) => {
    try {
      const response = await axios.put(`/v1/replies/${replyId}`, { 
        content,
        imageData 
      });
      return response;
    } catch (error) {
      console.error('답변 수정 실패:', error);
      throw error;
    }
  },
  
  // 답변 삭제
  deleteReply: async (replyId) => {
    try {
      const response = await axios.delete(`/v1/replies/${replyId}`);
      return response;
    } catch (error) {
      console.error('답변 삭제 실패:', error);
      throw error;
    }
  }
};