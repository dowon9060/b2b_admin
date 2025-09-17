import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MemberDetail({ members, setMembers }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const foundMember = members.find(m => m.id === parseInt(id));
    if (foundMember) {
      setMember(foundMember);
      setEditData(foundMember);
    }
  }, [id, members]);

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
          </div>
          
          <div className="form-group">
            <label>이메일</label>
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
    </div>
  );
}

export default MemberDetail;

