import React, { useState } from "react";
import { adminUsers, adminRoles } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function UserManagement() {
  const [users, setUsers] = useState(adminUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'viewer'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('all'); // all, active, inactive

  // 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  // 새 사용자 추가
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.phone) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    // 이메일 중복 체크
    if (users.find(u => u.email === newUser.email)) {
      alert('이미 존재하는 이메일입니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 실제 앱에서는 API 호출
      await new Promise(resolve => setTimeout(resolve, 1500));

      const selectedRole = adminRoles.find(r => r.id === newUser.role);
      const newId = Math.max(...users.map(u => u.id)) + 1;
      
      const userToAdd = {
        ...newUser,
        id: newId,
        roleLabel: selectedRole.label,
        createdDate: new Date().toISOString().split('T')[0],
        lastLogin: '-',
        status: 'active'
      };

      setUsers([...users, userToAdd]);
      setNewUser({ name: '', email: '', phone: '', role: 'viewer' });
      setShowAddModal(false);
      alert('관리자가 성공적으로 추가되었습니다.');
    } catch (error) {
      alert('관리자 추가 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 사용자 상태 변경
  const handleToggleStatus = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (user.role === 'super_admin') {
      alert('최고 관리자는 비활성화할 수 없습니다.');
      return;
    }

    try {
      const newStatus = user.status === 'active' ? 'inactive' : 'active';
      setUsers(users.map(u => 
        u.id === userId ? { ...u, status: newStatus } : u
      ));
      alert(`${user.name}님이 ${newStatus === 'active' ? '활성화' : '비활성화'}되었습니다.`);
    } catch (error) {
      alert('상태 변경 중 오류가 발생했습니다.');
    }
  };

  // 사용자 삭제
  const handleDeleteUser = async (userId) => {
    const user = users.find(u => u.id === userId);
    if (user.role === 'super_admin') {
      alert('최고 관리자는 삭제할 수 없습니다.');
      return;
    }

    if (!window.confirm(`${user.name}님을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      setUsers(users.filter(u => u.id !== userId));
      alert('관리자가 삭제되었습니다.');
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  // 권한 변경
  const handleRoleChange = async (userId, newRole) => {
    const user = users.find(u => u.id === userId);
    if (user.role === 'super_admin') {
      alert('최고 관리자의 권한은 변경할 수 없습니다.');
      return;
    }

    try {
      const selectedRole = adminRoles.find(r => r.id === newRole);
      setUsers(users.map(u => 
        u.id === userId ? { ...u, role: newRole, roleLabel: selectedRole.label } : u
      ));
      alert(`${user.name}님의 권한이 ${selectedRole.label}로 변경되었습니다.`);
    } catch (error) {
      alert('권한 변경 중 오류가 발생했습니다.');
    }
  };

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'status-badge success' : 'status-badge pending';
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'super_admin': return 'role-badge super-admin';
      case 'admin': return 'role-badge admin';
      case 'manager': return 'role-badge manager';
      default: return 'role-badge viewer';
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>사용자 관리</h2>
        <p>관리자 계정을 추가하고 권한을 관리합니다</p>
      </div>

      {/* 통계 */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">전체 관리자</div>
          <div className="stat-value">{users.length}명</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">활성 관리자</div>
          <div className="stat-value">{users.filter(u => u.status === 'active').length}명</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">비활성 관리자</div>
          <div className="stat-value">{users.filter(u => u.status === 'inactive').length}명</div>
        </div>
      </div>

      {/* 필터 및 추가 버튼 */}
      <div className="card">
        <div className="card-content">
          <div className="user-management-controls">
            <div className="filter-buttons">
              <button
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('all')}
              >
                전체
              </button>
              <button
                className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('active')}
              >
                활성
              </button>
              <button
                className={`btn ${filter === 'inactive' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter('inactive')}
              >
                비활성
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              관리자 추가
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
          <table className="table">
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>연락처</th>
                <th>권한</th>
                <th>상태</th>
                <th>마지막 로그인</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.role === 'super_admin' ? (
                      <span className={getRoleBadgeClass(user.role)}>
                        {user.roleLabel}
                      </span>
                    ) : (
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="form-control role-select"
                      >
                        {adminRoles.filter(r => r.id !== 'super_admin').map(role => (
                          <option key={role.id} value={role.id}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(user.status)}>
                      {user.status === 'active' ? '활성' : '비활성'}
                    </span>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      {user.role !== 'super_admin' && (
                        <>
                          <button
                            className={`btn btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === 'active' ? '비활성화' : '활성화'}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 권한 설명 */}
      <div className="card">
        <div className="card-header">
          <h3>권한 레벨 설명</h3>
        </div>
        <div className="card-content">
          <div className="permissions-grid">
            {adminRoles.map(role => (
              <div key={role.id} className="card permission-card">
                <div className="permission-header">
                  <span className={getRoleBadgeClass(role.id)}>{role.label}</span>
                </div>
                <div className="permission-description">
                  {role.description}
                </div>
              </div>
            ))}
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

              <div className="form-group">
                <label>권한 레벨 *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="form-control"
                >
                  {adminRoles.filter(r => r.id !== 'super_admin').map(role => (
                    <option key={role.id} value={role.id}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="card info-card">
                <h4>안내사항</h4>
                <ul>
                  <li>추가된 관리자에게는 초기 비밀번호가 이메일로 발송됩니다.</li>
                  <li>관리자는 최초 로그인 시 비밀번호를 변경해야 합니다.</li>
                  <li>권한은 추가 후에도 변경할 수 있습니다.</li>
                </ul>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
                disabled={isSubmitting}
              >
                취소
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddUser}
                disabled={isSubmitting || !newUser.name || !newUser.email || !newUser.phone}
              >
                {isSubmitting ? '추가 중...' : '관리자 추가'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
