// 환경 설정
const config = {
  development: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001',
    API_TIMEOUT: process.env.REACT_APP_API_TIMEOUT || 10000,
    ENV: 'development'
  },
  production: {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.doowoncompany.com',
    API_TIMEOUT: process.env.REACT_APP_API_TIMEOUT || 15000,
    ENV: 'production'
  }
};

const currentEnv = process.env.NODE_ENV || 'development';

export default {
  ...config[currentEnv],
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
  IS_DEVELOPMENT: currentEnv === 'development',
  IS_PRODUCTION: currentEnv === 'production'
};

// API 엔드포인트 정의
export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me'
  },
  
  // 구성원 관리
  MEMBERS: {
    LIST: '/members',
    CREATE: '/members',
    UPDATE: (id) => `/members/${id}`,
    DELETE: (id) => `/members/${id}`,
    DETAIL: (id) => `/members/${id}`
  },
  
  // 포인트 관리
  POINTS: {
    CHARGE: '/points/charge',
    GIFT: '/points/gift',
    HISTORY: '/points/history',
    BALANCE: '/points/balance'
  },
  
  // 이용현황
  USAGE: {
    LIST: '/usage',
    CREATE: '/usage',
    SUMMARY: '/usage/summary',
    MONTHLY: '/usage/monthly'
  },
  
  // 정산
  SETTLEMENT: {
    LIST: '/settlement',
    DETAIL: (month) => `/settlement/${month}`,
    CREATE: '/settlement'
  },
  
  // 대시보드
  DASHBOARD: {
    STATS: '/dashboard/stats',
    CHART_DATA: '/dashboard/chart',
    CATEGORIES: '/dashboard/categories'
  },
  
  // 설정
  SETTINGS: {
    DEPARTMENTS: '/settings/departments',
    ADMIN: '/settings/admin'
  }
};














