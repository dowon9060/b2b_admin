import React from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const adminInfo = {
    name: "관리자",
    email: "admin@doowoncompany.com",
    phone: "010-1234-5678",
    role: "시스템 관리자"
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>설정</h2>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>관리자 정보</h3>
        </div>
        <div className="card-content">
          <div className="info-grid">
            <div className="info-item">
              <label>이름</label>
              <span className="badge badge-info">{adminInfo.name}</span>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <span>{adminInfo.email}</span>
            </div>
            <div className="info-item">
              <label>연락처</label>
              <span>{adminInfo.phone}</span>
            </div>
            <div className="info-item">
              <label>권한</label>
              <span className="badge badge-success">{adminInfo.role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>설정 메뉴</h3>
        </div>
        <div className="card-content">
          <div className="settings-grid">
            <div className="card settings-card" onClick={() => navigate("/settings/departments")}>
              <div className="settings-content">
                <h4>부서 설정</h4>
                <p>부서 및 팀 관리</p>
                <div className="settings-arrow">→</div>
              </div>
            </div>
            
            <div className="card settings-card disabled">
              <div className="settings-content">
                <h4>권한 설정</h4>
                <p>사용자 권한 관리</p>
                <div className="settings-arrow">→</div>
              </div>
            </div>
            
            <div className="card settings-card disabled">
              <div className="settings-content">
                <h4>알림 설정</h4>
                <p>시스템 알림 관리</p>
                <div className="settings-arrow">→</div>
              </div>
            </div>
            
            <div className="card settings-card disabled">
              <div className="settings-content">
                <h4>보안 설정</h4>
                <p>비밀번호 정책 설정</p>
                <div className="settings-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;














