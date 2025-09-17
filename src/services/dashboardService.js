import httpClient, { API_ENDPOINTS } from './httpClient';

class DashboardService {
  // 대시보드 통계 데이터 조회
  async getDashboardStats() {
    try {
      return await httpClient.get(API_ENDPOINTS.DASHBOARD.STATS);
    } catch (error) {
      console.error('Get dashboard stats failed:', error);
      throw error;
    }
  }

  // 차트 데이터 조회 (최근 3개월 사용현황)
  async getChartData(params = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.DASHBOARD.CHART_DATA, params);
    } catch (error) {
      console.error('Get chart data failed:', error);
      throw error;
    }
  }

  // 이용종목 현황 조회
  async getCategoriesUsage(params = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.DASHBOARD.CATEGORIES, params);
    } catch (error) {
      console.error('Get categories usage failed:', error);
      throw error;
    }
  }
}

export default new DashboardService();














