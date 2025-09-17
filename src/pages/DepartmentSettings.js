import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DepartmentSettings({ departments, onAddDepartment }) {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDept, setNewDept] = useState({
    companyName: "",
    departmentName: "",
    teamName: ""
  });

  const handleAddDepartment = () => {
    if (newDept.companyName && newDept.departmentName && newDept.teamName) {
      onAddDepartment(newDept);
      setNewDept({ companyName: "", departmentName: "", teamName: "" });
      setShowAddForm(false);
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>부서 설정</h2>
        <p>회사의 부서와 팀을 관리할 수 있습니다</p>
      </div>

      <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="card-content">
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/settings')}
            >
              ← 설정으로 돌아가기
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              부서 추가
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>부서 목록</h3>
        </div>
        <div className="card-content">
          <table className="table">
            <thead>
              <tr>
                <th>회사명</th>
                <th>부서명</th>
                <th>팀명</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept.id}>
                  <td>{dept.companyName}</td>
                  <td>{dept.departmentName}</td>
                  <td>{dept.teamName}</td>
                  <td>
                    <div className="button-group">
                      <button className="btn btn-secondary btn-sm">수정</button>
                      <button className="btn btn-danger btn-sm">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 부서 추가 모달 */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>새 부서 추가</h3>
            </div>
            <div className="card-content">
              <div className="form-group">
                <label>회사명</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDept.companyName}
                  onChange={(e) => setNewDept({...newDept, companyName: e.target.value})}
                  placeholder="회사명을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label>부서명</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDept.departmentName}
                  onChange={(e) => setNewDept({...newDept, departmentName: e.target.value})}
                  placeholder="부서명을 입력하세요"
                />
              </div>
              <div className="form-group">
                <label>팀명</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDept.teamName}
                  onChange={(e) => setNewDept({...newDept, teamName: e.target.value})}
                  placeholder="팀명을 입력하세요"
                />
              </div>
            </div>
            <div className="card-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowAddForm(false)}
              >
                취소
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleAddDepartment}
              >
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentSettings;














