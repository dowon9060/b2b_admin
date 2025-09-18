import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usageData } from './utils/mockData';

function MemberDetail({ members, setMembers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    const foundMember = members.find(m => m.id === parseInt(id));
    if (foundMember) {
      setMember(foundMember);
      setEditData(foundMember);
    }
  }, [id, members]);

  // 구성원의 사용 포인트 계산
  const memberUsage = member ? usageData.filter(usage => usage.memberName === member.name) : [];
  const totalUsedPoints = memberUsage.reduce((sum, usage) => sum + usage.points, 0);
  const usageCount = memberUsage.length;

  // 이용권 기간 정보 생성 (실제 앱에서는 서버에서 받아옴)
  const getUsagePeriod = (usageDate, points) => {
    const startDate = new Date(usageDate);
    let days = 30; // 기본 30일
    
    // 포인트에 따른 이용 기간 설정
    if (points >= 50000) days = 90; // 3개월
    else if (points >= 30000) days = 60; // 2개월
    else if (points >= 20000) days = 30; // 1개월
    else days = 7; // 1주일
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);
    
    return `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditData(member);
    }
  };

  const handleSave = () => {
    setMembers(members.map(m => m.id === parseInt(id) ? editData : m));
    setMember(editData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

  const handlePasswordReset = async () => {
    setIsResettingPassword(true);
    
    try {
      // 실제 앱에서는 비밀번호 초기화 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500)); // 시뮬레이션
      
      alert(`${member.name}님의 비밀번호가 초기화되었습니다.\n\n초기화 비밀번호: dagym1\n\n해당 비밀번호로 로그인 후 비밀번호를 변경하도록 안내해주세요.`);
    } catch (error) {
      alert('비밀번호 초기화 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  if (!member) {
    return (
      <div className="page-container">
        <div className="card">
          <div className="card-content">
            <h2>구성원을 찾을 수 없습니다</h2>
            <button 
              className="btn btn-secondary" 
              onClick={() => navigate('/members')}
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{member.name} 구성원 정보</h2>
        <p>구성원의 상세 정보를 확인하고 수정할 수 있습니다</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>기본 정보</h3>
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/members')}
            >
              목록으로
            </button>
            {isEditing ? (
              <>
                <button 
                  className="btn btn-success" 
                  onClick={handleSave}
                >
                  저장
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={handleEditToggle}
                >
                  취소
                </button>
              </>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={handleEditToggle}
              >
                수정
              </button>
            )}
          </div>
        </div>

        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>이름</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={editData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <div className="form-control-static">{member.name}</div>
              )}
            </div>
            
            <div className="form-group">
              <label>부서</label>
              {isEditing ? (
                <select
                  className="form-control"
                  value={editData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  <option value="영업">영업</option>
                  <option value="개발">개발</option>
                  <option value="디자인">디자인</option>
                  <option value="마케팅">마케팅</option>
                  <option value="인사">인사</option>
                </select>
              ) : (
                <div className="form-control-static">{member.department}</div>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>사원번호</label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={editData.empNo}
                  onChange={(e) => handleInputChange('empNo', e.target.value)}
                />
              ) : (
                <div className="form-control-static">{member.empNo}</div>
              )}
            </div>
            
            <div className="form-group">
              <label>입사일</label>
              {isEditing ? (
                <input
                  type="date"
                  className="form-control"
                  value={editData.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                />
              ) : (
                <div className="form-control-static">{member.joinDate}</div>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>연락처</label>
              {isEditing ? (
                <input
                  type="tel"
                  className="form-control"
                  value={editData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="010-0000-0000"
                />
              ) : (
                <div className="form-control-static">
                  {member.phone || '정보 없음'}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>현재 포인트</label>
              {isEditing ? (
                <input
                  type="number"
                  className="form-control"
                  value={editData.point}
                  onChange={(e) => handleInputChange('point', parseInt(e.target.value))}
                />
              ) : (
                <div className="form-control-static point-value">
                  {member.point.toLocaleString()}P
                </div>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <div className="email-header">
              <label>이메일(아이디)</label>
              {!isEditing && (
                <button
                  className="btn btn-warning btn-sm"
                  onClick={handlePasswordReset}
                  disabled={isResettingPassword}
                >
                  {isResettingPassword ? '초기화 중...' : '비밀번호 초기화'}
                </button>
              )}
            </div>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                value={editData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@company.com"
              />
            ) : (
              <div className="form-control-static">
                {member.email || '정보 없음'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 포인트 사용 통계 */}
      <div className="card">
        <div className="card-header">
          <h3>포인트 사용 통계</h3>
        </div>
        <div className="card-content">
          <div className="stats-grid">
            <div className="card stat-card">
              <div className="stat-label">현재 보유 포인트</div>
              <div className="stat-value" style={{ color: 'var(--primary)' }}>
                {member.point.toLocaleString()}P
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">총 사용 포인트</div>
              <div className="stat-value" style={{ color: 'var(--danger)' }}>
                {totalUsedPoints.toLocaleString()}P
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-label">이용 건수</div>
              <div className="stat-value" style={{ color: 'var(--info)' }}>
                {usageCount}건
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 이용 내역 */}
      {memberUsage.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3>최근 이용 내역</h3>
            <p className="text-muted">최근 {Math.min(memberUsage.length, 10)}건의 이용 내역입니다</p>
          </div>
          <div className="card-content">
            <table className="table">
              <thead>
                <tr>
                  <th>결제일</th>
                  <th>사용 포인트</th>
                  <th>이용권 정보</th>
                </tr>
              </thead>
              <tbody>
                {memberUsage.slice(0, 10).map((usage, index) => (
                  <tr key={index}>
                    <td>{usage.usageDate}</td>
                    <td>{usage.points.toLocaleString()}P</td>
                    <td className="usage-period-cell">
                      <div className="usage-period-label">이용권 기간</div>
                      <div className="usage-period-date">{getUsagePeriod(usage.usageDate, usage.points)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberDetail;

