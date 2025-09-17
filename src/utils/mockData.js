// 초기 멤버 데이터
export const initialMembers = [
  { 
    id: 1, 
    name: "홍길동", 
    department: "영업", 
    joinDate: "2022-01-01", 
    empNo: "1001", 
    point: 1000, 
    phone: "010-1234-5678", 
    email: "hong@company.com", 
    userId: "hong@company.com" 
  },
  { 
    id: 2, 
    name: "김철수", 
    department: "개발", 
    joinDate: "2021-05-10", 
    empNo: "1002", 
    point: 800, 
    phone: "010-2345-6789", 
    email: "kim@company.com", 
    userId: "kim@company.com" 
  },
  { 
    id: 3, 
    name: "이영희", 
    department: "디자인", 
    joinDate: "2023-03-15", 
    empNo: "1003", 
    point: 1200, 
    phone: "010-3456-7890", 
    email: "lee@company.com", 
    userId: "lee@company.com" 
  },
];

// 대시보드 포인트 데이터
export const rawPointData = {
  remainingPoints: 5000000, // 현재 남아있는 전체 포인트
  totalUsedPoints: 1800000, // 누적 사용한 포인트
  chargeDate: "2024-01-15", // 포인트 결제일
  monthlyUsageData: [
    { year: 2024, month: 9, usage: 380000, count: 45 }, // 10월 (month는 0-based)
    { year: 2024, month: 10, usage: 420000, count: 52 }, // 11월
    { year: 2024, month: 11, usage: 450000, count: 48 }, // 12월
  ]
};

// 이용종목 데이터
export const categoryData = [
  { name: '강남헬스장', icon: '🏋️‍♀️', usage: 426000, color: '#667eea' },
  { name: '서초필라테스', icon: '🧘‍♀️', usage: 316800, color: '#764ba2' },
  { name: '역삼요가', icon: '🧘‍♂️', usage: 231600, color: '#f093fb' },
  { name: '논현크로스핏', icon: '🏃‍♀️', usage: 158400, color: '#f5576c' },
  { name: '신사PT', icon: '💪', usage: 85200, color: '#4facfe' },
  { name: '기타시설', icon: '🎯', usage: 36600, color: '#9c88ff' }
];

// 사용 현황 데이터 (UsageTable 등에서 사용)
export const usageData = [
  { id: 1, memberName: "홍길동", department: "영업", usageDate: "2024-12-15", facility: "강남헬스장", points: 50000, amount: 50000 },
  { id: 2, memberName: "김철수", department: "개발", usageDate: "2024-12-14", facility: "서초필라테스", points: 30000, amount: 30000 },
  { id: 3, memberName: "이영희", department: "디자인", usageDate: "2024-12-13", facility: "역삼요가", points: 25000, amount: 25000 },
  { id: 4, memberName: "박민수", department: "영업", usageDate: "2024-12-12", facility: "테헤란크로스핏", points: 40000, amount: 40000 },
  { id: 5, memberName: "정수현", department: "개발", usageDate: "2024-12-11", facility: "강남헬스장", points: 35000, amount: 35000 },
];

// 정산 데이터
export const settlementData = [
  { id: 1, month: "2024-12", totalUsage: 450000, memberCount: 48, avgUsage: 9375, status: "완료" },
  { id: 2, month: "2024-11", totalUsage: 420000, memberCount: 52, avgUsage: 8077, status: "완료" },
  { id: 3, month: "2024-10", totalUsage: 380000, memberCount: 45, avgUsage: 8444, status: "완료" },
];

// 부서 목록
export const departments = ["전체", "영업", "개발", "디자인"];
