import httpClient, { API_ENDPOINTS } from './httpClient';

class AuthService {
  // 로그인
  async login(credentials) {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (response.token) {
        httpClient.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // 로그아웃
  async logout() {
    try {
      await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      httpClient.setAuthToken(null);
    }
  }

  // 토큰 갱신
  async refreshToken() {
    try {
      const response = await httpClient.post(API_ENDPOINTS.AUTH.REFRESH);
      
      if (response.token) {
        httpClient.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      httpClient.setAuthToken(null);
      throw error;
    }
  }

  // 현재 사용자 정보 조회
  async getCurrentUser() {
    try {
      return await httpClient.get(API_ENDPOINTS.AUTH.ME);
    } catch (error) {
      console.error('Get current user failed:', error);
      throw error;
    }
  }

  // 인증 상태 확인
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }

  // 저장된 토큰 가져오기
  getToken() {
    return localStorage.getItem('auth_token');
  }
}

export default new AuthService();














