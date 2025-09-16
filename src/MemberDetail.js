import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MemberDetail({ members, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members.find(m => String(m.id) === String(id));
  
  // 이메일 분리 초기화
  const initForm = () => {
    if (!member) return {};
    const email = member.email || '';
    const [emailAccount, emailDomain] = email.split('@');
    return {
      ...member,
      emailAccount: emailAccount || '',
      emailDomain: emailDomain || ''
    };
  };
  
  const [form, setForm] = useState(initForm());
  const [pointChange, setPointChange] = useState(0);
  const [customInput, setCustomInput] = useState('');

  if (!member) return <div>구성원을 찾을 수 없습니다.</div>;

  const handleChange = e => {
    const { name, value } = e.target;
    
    // 이메일 계정 또는 도메인 변경 시 처리
    if (name === 'emailAccount' || name === 'emailDomain') {
      const emailAccount = name === 'emailAccount' ? value : form.emailAccount || '';
      const emailDomain = name === 'emailDomain' ? value : form.emailDomain || '';
      const fullEmail = emailAccount && emailDomain ? `${emailAccount}@${emailDomain}` : '';
      
      setForm({ 
        ...form, 
        emailAccount,
        emailDomain,
        email: fullEmail,
        userId: fullEmail  // 이메일과 아이디 동일하게 설정
      });
    } else if (name === 'email') {
      // 전체 이메일로 입력된 경우 분리
      const [account, domain] = value.split('@');
      setForm({ 
        ...form, 
        email: value,
        emailAccount: account || '',
        emailDomain: domain || '',
        userId: value
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // 비밀번호 초기화
  const handlePasswordReset = () => {
    const confirm = window.confirm(`${form.name}님의 비밀번호를 초기화하시겠습니까?\n초기 비밀번호는 "temp1234"로 설정됩니다.`);
    if (confirm) {
      // 실제로는 서버에 비밀번호 초기화 요청을 보냄
      alert(`${form.name}님의 비밀번호가 "temp1234"로 초기화되었습니다.\n로그인 시 비밀번호 변경을 안내해주세요.`);
    }
  };

  const handlePoint = (type) => {
    const value = Math.abs(Number(pointChange));
    if (!value) return;
    if (type === "add") setForm(f => ({ ...f, point: Number(f.point) + value }));
    else setForm(f => ({ ...f, point: Number(f.point) - value }));
    setPointChange(0);
  };

  const handleSave = () => {
    onUpdate(form);
    navigate("/members");
  };

  const handleGoBack = () => {
    navigate(-1); // 바로 전 페이지로 이동
  };

  return (
    <div className="member-detail-page">
      <div className="member-detail-header">
        <h2>구성원 상세 정보</h2>
      </div>
      
      <div className="member-detail-content">
        <div className="member-basic-info">
          <div className="info-row">
            <div className="info-group">
              <label>이름</label>
              <input name="name" value={form.name} onChange={handleChange} className="input-standard" />
            </div>
            <div className="info-group">
              <label>부서</label>
              <input name="department" value={form.department} onChange={handleChange} className="input-standard" />
            </div>
          </div>
          
          <div className="info-row">
            <div className="info-group">
              <label>사원번호</label>
              <input name="empNo" value={form.empNo} onChange={handleChange} className="input-standard" />
            </div>
            <div className="info-group">
              <label>입사일</label>
              <input name="joinDate" type="date" value={form.joinDate} onChange={handleChange} className="input-standard" />
            </div>
          </div>

          <div className="info-row">
            <div className="info-group">
              <label>연락처</label>
              <input name="phone" value={form.phone || ""} onChange={handleChange} className="input-standard" placeholder="010-0000-0000" />
            </div>
            <div className="info-group">
              <label>현재 포인트</label>
              <div className="point-display">{form.point.toLocaleString()} P</div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-group email-group">
              <label>이메일</label>
              <div className="email-input-group">
                <input 
                  name="emailAccount" 
                  value={form.emailAccount || ""} 
                  onChange={handleChange} 
                  className="email-account-input" 
                  placeholder="계정명" 
                />
                <span className="email-separator">@</span>
                <input 
                  name="emailDomain" 
                  value={form.emailDomain || ""} 
                  onChange={handleChange} 
                  className="email-domain-input" 
                  placeholder="도메인.com" 
                />
              </div>
            </div>
          </div>

          <div className="info-row">
            <div className="info-group userid-group">
              <label>아이디 (로그인 ID)</label>
              <div className="user-id-group">
                <input 
                  name="userId" 
                  value={form.userId || ""} 
                  onChange={handleChange} 
                  className="input-userid" 
                  placeholder="이메일과 동일하게 설정됩니다" 
                />
                <button type="button" className="password-reset-btn" onClick={handlePasswordReset}>
                  🔑 비밀번호 초기화
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="point-management">
          <h3>포인트 관리</h3>
          
          {/* 현재 포인트 표시 섹션 */}
          <div className="current-point-display">
            <span>현재 포인트: </span>
            <span className="current-point-value">{Number(form.point).toLocaleString()}P</span>
          </div>
          
          {/* 포인트 추가 섹션 */}
          <div className="point-add-section">
            <h4>포인트 추가</h4>
            
            <div className="quick-add-total">
              <span>선택된 총 포인트: </span>
              <span className="total-points">{pointChange.toLocaleString()}P</span>
              {pointChange !== 0 && (
                <button className="reset-points-btn" onClick={() => setPointChange(0)}>
                  초기화
                </button>
              )}
            </div>
            
            <div className="quick-add-buttons">
              <button onClick={() => setPointChange(prev => Number(prev) + 10000)} className="quick-add-btn">
                +10,000P
              </button>
              <button onClick={() => setPointChange(prev => Number(prev) + 30000)} className="quick-add-btn">
                +30,000P
              </button>
              <button onClick={() => setPointChange(prev => Number(prev) + 50000)} className="quick-add-btn">
                +50,000P
              </button>
              <button onClick={() => setPointChange(prev => Number(prev) + 100000)} className="quick-add-btn">
                +100,000P
              </button>
            </div>
            
            <div className="custom-add-section">
              <label>직접 입력:</label>
              <input 
                type="number" 
                value={customInput}
                onChange={e => setCustomInput(e.target.value)}
                placeholder="포인트 입력"
                className="custom-add-input"
              />
              <button 
                onClick={() => {
                  const value = Number(customInput);
                  if (value > 0) {
                    setPointChange(prev => Number(prev) + value);
                    setCustomInput('');
                  }
                }}
                className="add-custom-btn"
                disabled={!customInput || Number(customInput) <= 0}
              >
                추가
              </button>
              <button 
                onClick={() => {
                  const value = Number(customInput);
                  if (value > 0) {
                    setPointChange(prev => Number(prev) - value);
                    setCustomInput('');
                  }
                }}
                className="sub-custom-btn"
                disabled={!customInput || Number(customInput) <= 0}
              >
                차감
              </button>
              <span>P</span>
            </div>
            
            {/* 변경 후 포인트 미리보기 섹션 */}
            <div className="preview-point-display">
              <span>변경 후 포인트: </span>
              <span className="preview-point-value">
                {(() => {
                  const currentPoint = Number(form.point);
                  const changePoint = Number(pointChange);
                  if (changePoint > 0) {
                    return `${(currentPoint + changePoint).toLocaleString()}P`;
                  } else if (changePoint < 0) {
                    return `${(currentPoint + changePoint).toLocaleString()}P`;
                  } else {
                    return `${currentPoint.toLocaleString()}P`;
                  }
                })()}
              </span>
              {pointChange !== 0 && (
                <span className="change-indicator">
                  ({pointChange > 0 ? '+' : ''}{pointChange.toLocaleString()}P)
                </span>
              )}
            </div>
            
            {/* 적용하기 버튼 섹션 */}
            <div className="apply-section">
              <button 
                onClick={() => {
                  const value = Number(pointChange);
                  if (value > 0) {
                    handlePoint("add");
                  } else if (value < 0) {
                    handlePoint("sub");
                  }
                }}
                className="apply-btn"
                disabled={pointChange === 0}
              >
                적용하기
              </button>
            </div>
          </div>


        </div>
      </div>

      <div className="member-detail-footer">
        <button onClick={() => navigate("/members")} className="cancel-btn">돌아가기</button>
        <div className="footer-right-buttons">
          <button onClick={handleGoBack} className="back-btn">뒤로가기</button>
          <button onClick={handleSave} className="save-btn">수정하기</button>
        </div>
      </div>
    </div>
  );
}

export default MemberDetail;