import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, memberService, pointService, dashboardService } from '../services';

const ApiContext = createContext();

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export const ApiProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 초기 인증 상태 확인
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  // API 호출 래퍼 함수
  const apiCall = async (apiFunction, ...args) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (error) {
      setError(error.message || 'API 호출 중 오류가 발생했습니다.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 인증 관련 함수들
  const login = async (credentials) => {
    const result = await apiCall(authService.login, credentials);
    if (result.token) {
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = async () => {
    await apiCall(authService.logout);
    setIsAuthenticated(false);
  };

  // 구성원 관련 함수들
  const getMembers = (params) => apiCall(memberService.getMembers, params);
  const getMember = (id) => apiCall(memberService.getMember, id);
  const createMember = (data) => apiCall(memberService.createMember, data);
  const updateMember = (id, data) => apiCall(memberService.updateMember, id, data);
  const deleteMember = (id) => apiCall(memberService.deleteMember, id);

  // 포인트 관련 함수들
  const getPointBalance = () => apiCall(pointService.getPointBalance);
  const chargePoints = (data) => apiCall(pointService.chargePoints, data);
  const giftPoints = (data) => apiCall(pointService.giftPoints, data);
  const getPointHistory = (params) => apiCall(pointService.getPointHistory, params);

  // 대시보드 관련 함수들
  const getDashboardStats = () => apiCall(dashboardService.getDashboardStats);
  const getChartData = (params) => apiCall(dashboardService.getChartData, params);
  const getCategoriesUsage = (params) => apiCall(dashboardService.getCategoriesUsage, params);

  // 에러 클리어 함수
  const clearError = () => setError(null);

  const value = {
    // 상태
    isLoading,
    error,
    isAuthenticated,
    
    // 인증
    login,
    logout,
    
    // 구성원
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
    
    // 포인트
    getPointBalance,
    chargePoints,
    giftPoints,
    getPointHistory,
    
    // 대시보드
    getDashboardStats,
    getChartData,
    getCategoriesUsage,
    
    // 유틸리티
    clearError,
    apiCall
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};














