import { useState, useEffect } from 'react';
import { useApi } from '../context/ApiContext';
import { calculatePointData, generateChartData } from '../utils/pointUtils';

export const useDashboard = () => {
  const { getDashboardStats, getChartData, getCategoriesUsage, isLoading, error } = useApi();
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // 대시보드 통계 조회
  const fetchDashboardStats = async () => {
    try {
      const data = await getDashboardStats();
      setDashboardData(data);
      return data;
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      throw error;
    }
  };

  // 차트 데이터 조회
  const fetchChartData = async (params = {}) => {
    try {
      const data = await getChartData(params);
      setChartData(data.chartData || data);
      return data;
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
      throw error;
    }
  };

  // 이용종목 현황 조회
  const fetchCategoriesData = async (params = {}) => {
    try {
      const data = await getCategoriesUsage(params);
      setCategoriesData(data.categories || data);
      return data;
    } catch (error) {
      console.error('Failed to fetch categories data:', error);
      throw error;
    }
  };

  // 모든 대시보드 데이터 새로고침
  const refreshDashboard = async () => {
    try {
      await Promise.all([
        fetchDashboardStats(),
        fetchChartData(),
        fetchCategoriesData()
      ]);
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
      throw error;
    }
  };

  // 계산된 포인트 데이터 가져오기
  const getCalculatedPointData = () => {
    if (!dashboardData) return null;
    return calculatePointData(dashboardData);
  };

  // 포맷된 차트 데이터 가져오기
  const getFormattedChartData = () => {
    if (!chartData.length) return { chartData: [], maxUsage: 0 };
    return generateChartData(chartData);
  };

  // 초기 데이터 로드
  useEffect(() => {
    if (!initialized) {
      refreshDashboard().finally(() => setInitialized(true));
    }
  }, [initialized]);

  return {
    dashboardData,
    chartData,
    categoriesData,
    isLoading,
    error,
    fetchDashboardStats,
    fetchChartData,
    fetchCategoriesData,
    refreshDashboard,
    getCalculatedPointData,
    getFormattedChartData,
    initialized
  };
};














