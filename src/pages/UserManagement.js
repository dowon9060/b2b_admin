import React, { useState } from "react";
import { adminUsers, adminRoles } from "../utils/mockData";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Toast";

function UserManagement() {
  const [users, setUsers] = useState(adminUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'admin'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, removeToast, success, error, warning } = useToast();

  // 새 사용자 추가
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      warning('모든 필드를 입력해주세요.');
      return;
    }

    // 이메일 중복 체크
    if (users.find(u => u.email === newUser.email)) {
      error('이미 존재하는 이메일입니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 앱에서는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newId = Math.max(...users.map(u => u.id)) + 1;
      
      const userToAdd = {
        ...newUser,
        id: newId,
        role: 'admin',
        roleLabel: '관리자',
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: '-',
        status: 'active'
      };

      setUsers([...users, userToAdd]);
      setNewUser({ name: '', email: '', phone: '', role: 'admin' });
      setShowAddModal(false);
      success(`${newUser.name}님이 관리자로 추가되었습니다.`);
    } catch (error) {
      error('관리자 추가 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="page-container">
      <div className="page-header">
        <h2>사용자 관리</h2>
        <p>관리자 계정을 추가하고 관리합니다</p>
      </div>

      {/* 통계 */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">전체 관리자</div>
          <div className="stat-value">{users.length}명</div>
        </div>
      </div>

      {/* 계정 추가 버튼 */}
      <div className="card">
        <div className="card-content">
          <div className="user-management-controls">
            <div></div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ 관리자 추가
            </button>
          </div>
        </div>
      </div>

      {/* 관리자 목록 */}
      <div className="card">
        <div className="card-header">
          <h3>관리자 목록</h3>
        </div>
        <div className="card-content">
          {/* 데스크톱 테이블 뷰 */}
          <div className="desktop-table-view">
            {users.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>연락처</th>
                    <th>계정 생성일</th>
                    <th>마지막 로그인</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.createdDate}</td>
                      <td>{user.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <h3>등록된 관리자가 없습니다</h3>
                <p>새로운 관리자를 추가하여 시스템을 관리해보세요.</p>
              </div>
            )}
          </div>

          {/* 모바일 카드 뷰 */}
          <div className="mobile-card-view">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-card-header">
                    <div className="user-card-info">
                      <h4>{user.name}</h4>
                      <div className="email">{user.email}</div>
                    </div>
                  </div>

                  <div className="user-card-details">
                    <div className="user-card-detail">
                      <div className="label">연락처</div>
                      <div className="value">{user.phone}</div>
                    </div>
                    <div className="user-card-detail">
                      <div className="label">계정 생성일</div>
                      <div className="value">{user.createdDate}</div>
                    </div>
                    <div className="user-card-detail">
                      <div className="label">마지막 로그인</div>
                      <div className="value">{user.lastLogin}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">👥</div>
                <h3>등록된 관리자가 없습니다</h3>
                <p>새로운 관리자를 추가하여 시스템을 관리해보세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 관리자 추가 모달 */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>새 관리자 추가</h3>
              <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>×</button>
            </div>

            <div className="card-content">
              <div className="form-group">
                <label>이름 *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="관리자 이름을 입력하세요"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>이메일 *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="admin@company.com"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>연락처 *</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                  placeholder="010-0000-0000"
                  className="form-control"
                />
              </div>


              <div className="card info-card">
                <h4>안내사항</h4>
                <ul>
                  <li>추가된 관리자에게는 초기 비밀번호가 이메일로 발송됩니다.</li>
                  <li>관리자는 최초 로그인 시 비밀번호를 변경해야 합니다.</li>
                </ul>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              >
                ✕ 취소
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddUser}
                disabled={isSubmitting || !newUser.name || !newUser.email || !newUser.phone}
              >
                {isSubmitting && <div className="loading-spinner"></div>}
                {isSubmitting ? '추가 중...' : '✓ 관리자 추가'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림 */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
            duration={toast.duration}
          />
        ))}
      </div>
    </div>
  );
}

export default UserManagement;
