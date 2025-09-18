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
    userId: "hong@company.com",
    inviteStatus: "accepted", // 초대 수락됨
    inviteDate: "2022-01-01"
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
    userId: "kim@company.com",
    inviteStatus: "pending", // 초대 대기중
    inviteDate: "2024-12-10"
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
    userId: "lee@company.com",
    inviteStatus: "accepted", // 초대 수락됨
    inviteDate: "2023-03-15"
  },
  { 
    id: 4, 
    name: "박민수", 
    department: "영업", 
    joinDate: null, 
    empNo: "1004", 
    point: 0, 
    phone: "010-4567-8901", 
    email: "park@company.com", 
    userId: "park@company.com",
    inviteStatus: "rejected", // 초대 거절됨 (X 상태)
    inviteDate: "2024-12-05"
  },
  { 
    id: 5, 
    name: "정수현", 
    department: "개발", 
    joinDate: null, 
    empNo: "1005", 
    point: 0, 
    phone: "010-5678-9012", 
    email: "jung@company.com", 
    userId: "jung@company.com",
    inviteStatus: "pending", // 초대 대기중
    inviteDate: "2024-12-12"
  },
  { 
    id: 6, 
    name: "최유리", 
    department: "마케팅", 
    joinDate: "2024-11-20", 
    empNo: "1006", 
    point: 500, 
    phone: "010-6789-0123", 
    email: "choi@company.com", 
    userId: "choi@company.com",
    inviteStatus: "accepted", // 초대 수락됨
    inviteDate: "2024-11-20"
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

// 선물 상품 데이터
export const giftProducts = [
  {
    id: 1,
    name: "PT 개인레슨 1회",
    description: "전문 트레이너와 1:1 개인 레슨 (50분)",
    points: 80000,
    category: "PT",
    duration: "50분",
    validity: "3개월",
    image: "🏋️‍♂️"
  },
  {
    id: 2,
    name: "PT 개인레슨 5회 패키지",
    description: "전문 트레이너와 1:1 개인 레슨 5회 패키지",
    points: 350000,
    category: "PT",
    duration: "50분 × 5회",
    validity: "6개월",
    image: "🏋️‍♀️"
  },
  {
    id: 3,
    name: "헬스장 1개월 이용권",
    description: "헬스장 자유 이용권 (1개월)",
    points: 50000,
    category: "헬스",
    duration: "무제한",
    validity: "1개월",
    image: "💪"
  },
  {
    id: 4,
    name: "헬스장 3개월 이용권",
    description: "헬스장 자유 이용권 (3개월)",
    points: 120000,
    category: "헬스",
    duration: "무제한",
    validity: "3개월",
    image: "🏃‍♂️"
  },
  {
    id: 5,
    name: "필라테스 그룹레슨 10회",
    description: "소규모 그룹 필라테스 레슨 10회",
    points: 200000,
    category: "필라테스",
    duration: "60분 × 10회",
    validity: "3개월",
    image: "🧘‍♀️"
  },
  {
    id: 6,
    name: "요가 그룹레슨 15회",
    description: "요가 그룹 레슨 15회 패키지",
    points: 180000,
    category: "요가",
    duration: "70분 × 15회",
    validity: "4개월",
    image: "🕉️"
  },
  {
    id: 7,
    name: "수영 자유 이용권 2개월",
    description: "수영장 자유 이용권 (2개월)",
    points: 90000,
    category: "수영",
    duration: "무제한",
    validity: "2개월",
    image: "🏊‍♂️"
  },
  {
    id: 8,
    name: "스피닝 클래스 20회",
    description: "고강도 스피닝 클래스 20회",
    points: 160000,
    category: "스피닝",
    duration: "45분 × 20회",
    validity: "3개월",
    image: "🚴‍♀️"
  },
  {
    id: 9,
    name: "다짐 굿즈 세트",
    description: "다짐 브랜드 운동복 + 물병 + 수건 세트",
    points: 45000,
    category: "굿즈",
    duration: "-",
    validity: "무제한",
    image: "🎁"
  },
  {
    id: 10,
    name: "운동 상담 + 식단 컨설팅",
    description: "전문가 운동 상담 및 개인 맞춤 식단 컨설팅",
    points: 70000,
    category: "상담",
    duration: "90분",
    validity: "1개월",
    image: "📋"
  }
];

// 선물 카테고리
export const giftCategories = [
  { id: "all", name: "전체" },
  { id: "PT", name: "개인레슨" },
  { id: "헬스", name: "헬스장" },
  { id: "필라테스", name: "필라테스" },
  { id: "요가", name: "요가" },
  { id: "수영", name: "수영" },
  { id: "스피닝", name: "스피닝" },
  { id: "굿즈", name: "굿즈" },
  { id: "상담", name: "상담" }
];

// 선물 내역 데이터
export const giftHistory = [
  {
    id: 1,
    memberName: "홍길동",
    memberDept: "영업",
    productName: "PT 개인레슨 1회",
    points: 80000,
    giftDate: "2024-12-15",
    status: "전송완료",
    usageStatus: "미사용"
  },
  {
    id: 2,
    memberName: "김철수",
    memberDept: "개발",
    productName: "헬스장 1개월 이용권",
    points: 50000,
    giftDate: "2024-12-14",
    status: "전송완료",
    usageStatus: "사용중"
  },
  {
    id: 3,
    memberName: "이영희",
    memberDept: "디자인",
    productName: "요가 그룹레슨 15회",
    points: 180000,
    giftDate: "2024-12-13",
    status: "전송완료",
    usageStatus: "사용완료"
  }
];
