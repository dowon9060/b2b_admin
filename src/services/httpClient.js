import config, { API_ENDPOINTS } from '../config/environment';

// HTTP 클라이언트 클래스
class HttpClient {
  constructor() {
    this.baseURL = config.API_BASE_URL;
    this.timeout = config.API_TIMEOUT;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  // 인증 토큰 설정
  setAuthToken(token) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('auth_token', token);
    } else {
      delete this.defaultHeaders['Authorization'];
      localStorage.removeItem('auth_token');
    }
  }

  // 저장된 토큰 로드
  loadToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setAuthToken(token);
    }
  }

  // 기본 요청 메서드
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: options.method || 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      ...options
    };

    // Body가 있고 GET 요청이 아닌 경우에만 body 추가
    if (options.body && config.method !== 'GET') {
      config.body = typeof options.body === 'string' 
        ? options.body 
        : JSON.stringify(options.body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      config.signal = controller.signal;

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      // 응답 상태 확인
      if (!response.ok) {
        throw await this.handleError(response);
      }

      // JSON 응답 파싱
      const data = await response.json();
      return data;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // 에러 처리
  async handleError(response) {
    let errorMessage = `HTTP Error: ${response.status}`;
    
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch (e) {
      // JSON 파싱 실패 시 기본 메시지 사용
    }

    // 인증 에러 처리
    if (response.status === 401) {
      this.setAuthToken(null); // 토큰 제거
      window.location.href = '/login'; // 로그인 페이지로 리다이렉트
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    return error;
  }

  // GET 요청
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, { method: 'GET' });
  }

  // POST 요청
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data
    });
  }

  // PUT 요청
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data
    });
  }

  // PATCH 요청
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data
    });
  }

  // DELETE 요청
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // 파일 업로드
  async upload(endpoint, formData) {
    const headers = { ...this.defaultHeaders };
    delete headers['Content-Type']; // FormData는 Content-Type을 자동 설정

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers
    });
  }
}

// 싱글톤 인스턴스 생성
const httpClient = new HttpClient();

// 페이지 로드 시 토큰 자동 로드
httpClient.loadToken();

export default httpClient;
export { API_ENDPOINTS };














