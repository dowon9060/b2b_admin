// 소멸예상일 계산
export const getExpirationDate = (chargeDate) => {
  const date = new Date(chargeDate);
  date.setMonth(date.getMonth() + 6);
  return date;
};

// 포인트 데이터 계산
export const calculatePointData = (rawData) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // 소멸예상일 계산 및 소멸 포인트 확인
  const expirationDate = getExpirationDate(rawData.chargeDate);
  const isExpired = today > expirationDate;
  const expiringPoints = isExpired ? 0 : 150000;

  // 이번달 사용한 포인트
  const thisMonthUsage = rawData.monthlyUsageData.find(
    data => data.year === currentYear && data.month === currentMonth
  );
  const monthlyUsedPoints = thisMonthUsage ? thisMonthUsage.usage : 0;

  // 최근 3개월 평균 사용 포인트
  const recentThreeMonths = rawData.monthlyUsageData.slice(-3);
  const averageUsage = Math.round(
    recentThreeMonths.reduce((sum, data) => sum + data.usage, 0) / recentThreeMonths.length
  );

  return {
    totalPoints: rawData.remainingPoints,
    availablePoints: rawData.remainingPoints - expiringPoints,
    usedPoints: rawData.totalUsedPoints,
    monthlyUsedPoints,
    expiringPoints,
    averageUsage,
    expirationDate: expirationDate.toLocaleDateString('ko-KR')
  };
};

// 차트 데이터 생성
export const generateChartData = (monthlyData) => {
  const months = ['10월', '11월', '12월'];
  const maxUsage = Math.max(...monthlyData.map(d => d.usage));
  
  return {
    chartData: monthlyData.map((data, index) => ({
      month: months[index],
      usage: data.usage,
      count: data.count
    })),
    maxUsage
  };
};

// 숫자를 천 단위 구분자로 포맷팅
export const formatNumber = (num) => {
  return num.toLocaleString();
};

// 날짜 관련 유틸리티
export const getCurrentDateInfo = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
    today
  };
};







