import React, { useState, useEffect } from 'react';
import '../App.css';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    totalPoints: 0,
    monthlyUsage: 0,
    pendingSettlements: 0
  });

  useEffect(() => {
    // 실제 앱에서는 API에서 데이터를 가져옴
    setDashboardData({
      totalMembers: 156,
      totalPoints: 2540000,
      monthlyUsage: 890000,
      pendingSettlements: 12
    });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>B2B 관리자 대시보드</h2>
        <p>전체 현황을 한눈에 확인하세요</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">총 구성원</div>
          <div className="stat-value">{dashboardData.totalMembers.toLocaleString()}명</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">보유 포인트</div>
          <div className="stat-value">{dashboardData.totalPoints.toLocaleString()}P</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">이번 달 사용</div>
          <div className="stat-value">{dashboardData.monthlyUsage.toLocaleString()}P</div>
        </div>

        <div className="card stat-card">
          <div className="stat-label">정산 대기</div>
          <div className="stat-value">{dashboardData.pendingSettlements}건</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>최근 활동</h3>
          </div>
          <div className="card-content">
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-time">10:30</span>
                <span className="activity-text">김영희님이 포인트 충전을 완료했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">09:15</span>
                <span className="activity-text">개발팀에 선물이 전송되었습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">08:45</span>
                <span className="activity-text">3월 정산이 완료되었습니다.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>부서별 포인트 사용량</h3>
          </div>
          <div className="card-content">
            <div className="department-usage">
              <div className="usage-bar">
                <span className="department-name">영업부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '75%'}}></div>
                </div>
                <span className="usage-amount">450,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">개발부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '60%'}}></div>
                </div>
                <span className="usage-amount">360,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">마케팅부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '40%'}}></div>
                </div>
                <span className="usage-amount">240,000P</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
