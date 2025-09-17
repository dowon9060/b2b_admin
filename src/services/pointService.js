import httpClient, { API_ENDPOINTS } from './httpClient';

class PointService {
  // 포인트 잔액 조회
  async getPointBalance() {
    try {
      return await httpClient.get(API_ENDPOINTS.POINTS.BALANCE);
    } catch (error) {
      console.error('Get point balance failed:', error);
      throw error;
    }
  }

  // 포인트 충전
  async chargePoints(chargeData) {
    try {
      return await httpClient.post(API_ENDPOINTS.POINTS.CHARGE, chargeData);
    } catch (error) {
      console.error('Charge points failed:', error);
      throw error;
    }
  }

  // 포인트 선물
  async giftPoints(giftData) {
    try {
      return await httpClient.post(API_ENDPOINTS.POINTS.GIFT, giftData);
    } catch (error) {
      console.error('Gift points failed:', error);
      throw error;
    }
  }

  // 포인트 히스토리 조회
  async getPointHistory(params = {}) {
    try {
      return await httpClient.get(API_ENDPOINTS.POINTS.HISTORY, params);
    } catch (error) {
      console.error('Get point history failed:', error);
      throw error;
    }
  }

  // 포인트 사용
  async usePoints(usageData) {
    try {
      return await httpClient.post(`${API_ENDPOINTS.POINTS.BALANCE}/use`, usageData);
    } catch (error) {
      console.error('Use points failed:', error);
      throw error;
    }
  }

  // 포인트 환불
  async refundPoints(refundData) {
    try {
      return await httpClient.post(`${API_ENDPOINTS.POINTS.BALANCE}/refund`, refundData);
    } catch (error) {
      console.error('Refund points failed:', error);
      throw error;
    }
  }
}

export default new PointService();














