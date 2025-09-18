import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Dashboard({ members = [] }) {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    totalPoints: 0,
    monthlyUsage: 0,
    pendingInvites: 0
  });
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    // 초대 미수락 회원 계산
    const pendingInviteMembers = members.filter(member => member.inviteStatus === 'pending');
    const acceptedMembers = members.filter(member => member.inviteStatus === 'accepted');
    
    setPendingMembers(pendingInviteMembers);
    
    // 실제 앱에서는 API에서 데이터를 가져옴
    setDashboardData({
      totalMembers: acceptedMembers.length,
      totalPoints: 2540000,
      monthlyUsage: 890000,
      pendingInvites: pendingInviteMembers.length
    });
  }, [members]);

  const handleInviteCardClick = () => {
    if (dashboardData.pendingInvites > 0) {
      setShowInviteModal(true);
    }
  };

  const handlePointsCardClick = () => {
    navigate('/charge');
  };

  const handleUsageCardClick = () => {
    navigate('/usage');
  };

  const handleResendInvite = async (member) => {
    setIsResending(true);
    
    try {
      // 실제 앱에서는 이메일 발송 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000)); // 시뮬레이션
      
      alert(`${member.name}님에게 초대 메일이 재발송되었습니다.\n이메일: ${member.email}`);
    } catch (error) {
      alert('이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsResending(false);
    }
  };

  const handleResendAllInvites = async () => {
    setIsResending(true);
    
    try {
      // 실제 앱에서는 일괄 이메일 발송 API 호출
      await new Promise(resolve => setTimeout(resolve, 3000)); // 시뮬레이션
      
      alert(`총 ${pendingMembers.length}명에게 초대 메일이 일괄 재발송되었습니다.`);
      setShowInviteModal(false);
    } catch (error) {
      alert('일괄 이메일 발송 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>B2B 관리자 대시보드</h2>
        <p>전체 현황을 한눈에 확인하세요</p>
      </div>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">총 임직원</div>
          <div className="stat-value">
            {dashboardData.totalMembers.toLocaleString()}명
            {dashboardData.pendingInvites > 0 && (
              <span 
                className="pending-invites" 
                onClick={handleInviteCardClick}
                style={{ 
                  fontSize: '0.9rem', 
                  color: '#f56565', 
                  marginLeft: '8px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                (미수락 {dashboardData.pendingInvites}명)
              </span>
            )}
          </div>
        </div>

        <div className="card stat-card clickable-card" onClick={handlePointsCardClick}>
          <div className="stat-label">보유 포인트</div>
          <div className="stat-value">{dashboardData.totalPoints.toLocaleString()}P</div>
        </div>

        <div className="card stat-card clickable-card" onClick={handleUsageCardClick}>
          <div className="stat-label">이번 달 사용</div>
          <div className="stat-value">{dashboardData.monthlyUsage.toLocaleString()}P</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>최근 활동</h3>
          </div>
          <div className="card-content">
            <div className="activity-list scrollable-content">
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
                <span className="activity-text">홍길동님이 100,000P를 충전했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">08:20</span>
                <span className="activity-text">마케팅부에 생일 선물이 전송되었습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">07:55</span>
                <span className="activity-text">이영희님이 200,000P를 충전했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">07:30</span>
                <span className="activity-text">박민수님이 50,000P를 충전했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">07:10</span>
                <span className="activity-text">인사부에 환영 선물이 전송되었습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">06:45</span>
                <span className="activity-text">최유리님이 300,000P를 충전했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">06:20</span>
                <span className="activity-text">영업부에 인센티브 선물이 전송되었습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">06:00</span>
                <span className="activity-text">정수현님이 150,000P를 충전했습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">05:40</span>
                <span className="activity-text">개발부에 야근 선물이 전송되었습니다.</span>
              </div>
              <div className="activity-item">
                <span className="activity-time">05:15</span>
                <span className="activity-text">김철수님이 80,000P를 충전했습니다.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>부서별 포인트 사용량</h3>
          </div>
          <div className="card-content">
            <div className="department-usage scrollable-content">
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
              <div className="usage-bar">
                <span className="department-name">인사부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '55%'}}></div>
                </div>
                <span className="usage-amount">330,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">기획부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '35%'}}></div>
                </div>
                <span className="usage-amount">210,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">디자인부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '50%'}}></div>
                </div>
                <span className="usage-amount">300,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">재무부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '30%'}}></div>
                </div>
                <span className="usage-amount">180,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">법무부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '25%'}}></div>
                </div>
                <span className="usage-amount">150,000P</span>
              </div>
              <div className="usage-bar">
                <span className="department-name">운영부</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: '45%'}}></div>
                </div>
                <span className="usage-amount">270,000P</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 초대 미수락 임직원 모달 */}
      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="card modal-card large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>초대 미수락 임직원</h3>
              <button className="btn btn-secondary" onClick={() => setShowInviteModal(false)}>×</button>
            </div>

            <div className="card-content">
              <div className="card info-card">
                <p>
                  총 <strong>{pendingMembers.length}명</strong>의 임직원이 초대를 수락하지 않았습니다.
                  아래 목록에서 개별 또는 일괄로 초대 메일을 재발송할 수 있습니다.
                </p>
              </div>

              <div className="card">
                <div className="card-header">
                  <h4>미수락 임직원 목록</h4>
                </div>
                <div className="card-content">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>부서</th>
                        <th>이메일</th>
                        <th>초대일</th>
                        <th>대기일수</th>
                        <th>재발송</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingMembers.map(member => {
                        const daysSinceInvite = Math.floor(
                          (new Date() - new Date(member.inviteDate)) / (1000 * 60 * 60 * 24)
                        );
                        
                        return (
                          <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.department}</td>
                            <td>{member.email}</td>
                            <td>{member.inviteDate}</td>
                            <td>
                              <span className={daysSinceInvite > 7 ? 'text-warning' : ''}>
                                {daysSinceInvite}일
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleResendInvite(member)}
                                disabled={isResending}
                              >
                                {isResending ? '발송중...' : '재발송'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {isResending && (
                <div className="card">
                  <div className="resending-progress">
                    <h4>이메일 발송 중...</h4>
                    <div className="progress-indicator">
                      <div className="spinner"></div>
                      <span>초대 메일을 발송하고 있습니다. 잠시만 기다려주세요.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowInviteModal(false)}
                disabled={isResending}
              >
                닫기
              </button>
              <button
                className="btn btn-primary"
                onClick={handleResendAllInvites}
                disabled={isResending || pendingMembers.length === 0}
              >
                {isResending ? '발송 중...' : `전체 ${pendingMembers.length}명에게 일괄 재발송`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;