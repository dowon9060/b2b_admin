import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const departments = ["전체", "영업", "개발", "디자인"];

function MemberList({ members, setMembers }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("전체");
  const [selected, setSelected] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // "list" 또는 "department"
  const [collapsedDepts, setCollapsedDepts] = useState({}); // 접힌 부서들
  const navigate = useNavigate();

  // 필터링
  const filtered = members.filter(
    m =>
      (dept === "전체" || m.department === dept) &&
      m.name.includes(search)
  );

  // 부서별 그룹화
  const groupedByDepartment = filtered.reduce((groups, member) => {
    const department = member.department;
    if (!groups[department]) {
      groups[department] = [];
    }
    groups[department].push(member);
    return groups;
  }, {});

  // 체크박스 핸들러
  const handleSelect = (id) => {
    setSelected(selected =>
      selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]
    );
  };

  // 전체 선택
  const handleSelectAll = (checked) => {
    setSelected(checked ? filtered.map(m => m.id) : []);
  };

  // 부서 접기/펼치기
  const toggleDepartment = (department) => {
    setCollapsedDepts(prev => ({
      ...prev,
      [department]: !prev[department]
    }));
  };

  // 포인트 일괄지급 상태
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkPointData, setBulkPointData] = useState({
    startDate: "",
    endDate: "",
    quarter: "1분기",
    pointAmount: "",
    customAmount: ""
  });

  // 구성원 등록 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberData, setNewMemberData] = useState({
    name: "",
    department: "",
    empNo: "",
    joinDate: "",
    point: 0,
    phone: "",
    email: "",
    userId: ""
  });

  // 엑셀 업로드 모달 상태
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // 일괄 포인트 지급 팝업 열기
  const handleBulkPoint = () => {
    if (selected.length === 0) {
      alert("선택된 구성원이 없습니다.");
      return;
    }
    setShowBulkModal(true);
  };

  // 포인트 금액 선택
  const handlePointAmountSelect = (amount) => {
    setBulkPointData({
      ...bulkPointData,
      pointAmount: amount,
      customAmount: ""
    });
  };

  // 수기 입력 변경
  const handleCustomAmountChange = (value) => {
    setBulkPointData({
      ...bulkPointData,
      pointAmount: "",
      customAmount: value
    });
  };

  // 최종 발급하기
  const handleFinalIssue = () => {
    const amount = bulkPointData.pointAmount || Number(bulkPointData.customAmount);
    if (!amount || amount < 1000) {
      alert("최소 1,000포인트 이상 입력해주세요.");
      return;
    }
    if (!bulkPointData.startDate || !bulkPointData.endDate) {
      alert("시작일과 종료일을 설정해주세요.");
      return;
    }

    setMembers(members =>
      members.map(m =>
        selected.includes(m.id) ? { ...m, point: m.point + amount } : m
      )
    );
    
    // 모달 닫기 및 초기화
    setShowBulkModal(false);
    setBulkPointData({
      startDate: "",
      endDate: "",
      quarter: "1분기",
      pointAmount: "",
      customAmount: ""
    });
    setSelected([]);
    
    alert(`${selected.length}명에게 ${amount.toLocaleString()}포인트가 지급되었습니다.`);
  };

  // 구성원 등록 모달 열기
  const handleAddMember = () => {
    setShowAddModal(true);
  };

  // 새 구성원 데이터 변경
  const handleNewMemberChange = (field, value) => {
    // 이메일 변경 시 아이디도 자동으로 설정
    if (field === 'email') {
      setNewMemberData({
        ...newMemberData,
        [field]: value,
        userId: value  // 이메일과 아이디 동일하게 설정
      });
    } else {
      setNewMemberData({
        ...newMemberData,
        [field]: value
      });
    }
  };

  // 새 구성원 저장
  const handleSaveNewMember = () => {
    // 유효성 검증
    if (!newMemberData.name.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }
    if (!newMemberData.department.trim()) {
      alert("부서를 입력해주세요.");
      return;
    }
    if (!newMemberData.empNo.trim()) {
      alert("사원번호를 입력해주세요.");
      return;
    }
    if (!newMemberData.joinDate) {
      alert("입사일을 선택해주세요.");
      return;
    }

    // 새 ID 생성
    const newId = Math.max(...members.map(m => m.id)) + 1;
    const newMember = {
      ...newMemberData,
      id: newId,
      point: Number(newMemberData.point) || 0
    };

    // 구성원 추가
    setMembers(prev => [...prev, newMember]);

    // 모달 닫기 및 초기화
    setShowAddModal(false);
    setNewMemberData({
      name: "",
      department: "",
      empNo: "",
      joinDate: "",
      point: 0,
      phone: "",
      email: "",
      userId: ""
    });

    alert("새 구성원이 등록되었습니다!");
  };

  // 구성원 행 클릭 시 상세페이지로 이동
  const handleRowClick = (memberId) => {
    navigate(`/members/${memberId}`);
  };

  // 엑셀 업로드 모달 열기
  const handleExcelUpload = () => {
    setShowExcelModal(true);
  };

  // 파일 선택 핸들러
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 엑셀 파일 형식 검증
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel', // .xls
        'text/csv' // .csv
      ];
      
      if (!validTypes.includes(file.type)) {
        alert('엑셀 파일(.xlsx, .xls) 또는 CSV 파일(.csv)만 업로드 가능합니다.');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // 파일 업로드 실행
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // 실제로는 서버에 파일을 업로드하고 파싱 결과를 받아옴
    // 여기서는 시뮬레이션으로 처리
    try {
      // 업로드 진행률 시뮬레이션
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // 예시 데이터 (실제로는 서버에서 파싱된 데이터를 받음)
      const exampleData = [
        { name: "박민수", department: "마케팅", empNo: "1004", joinDate: "2024-01-15", phone: "010-4567-8901", email: "park@company.com", userId: "park@company.com", point: 500 },
        { name: "정수진", department: "인사", empNo: "1005", joinDate: "2024-02-01", phone: "010-5678-9012", email: "jung@company.com", userId: "jung@company.com", point: 300 }
      ];

      // 새 ID 생성하여 구성원 추가
      const newMembers = exampleData.map((member, index) => ({
        ...member,
        id: Math.max(...members.map(m => m.id)) + index + 1
      }));

      setMembers(prev => [...prev, ...newMembers]);
      
      // 모달 닫기 및 초기화
      setShowExcelModal(false);
      setSelectedFile(null);
      setUploadProgress(0);
      
      alert(`${newMembers.length}명의 구성원이 성공적으로 등록되었습니다!`);
      
    } catch (error) {
      alert('파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  // 엑셀 템플릿 다운로드
  const handleDownloadTemplate = () => {
    // 실제로는 서버에서 템플릿 파일을 다운로드
    const csvContent = "이름,부서,사원번호,입사일,연락처,이메일,아이디,초기포인트\n홍길동,영업,1001,2024-01-01,010-1234-5678,hong@company.com,hong@company.com,1000";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "구성원_업로드_템플릿.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="member-table-header">
        <div className="search-filter-group">
          <div className="view-mode-buttons">
            <button 
              className={`view-mode-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              📋 이름으로 보기
            </button>
            <button 
              className={`view-mode-btn ${viewMode === "department" ? "active" : ""}`}
              onClick={() => setViewMode("department")}
            >
              🏢 부서별 보기
            </button>
          </div>
          <div className="search-controls">
            <input
              type="text"
              placeholder="이름 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ marginRight: "1rem" }}
            />
            <select value={dept} onChange={e => setDept(e.target.value)}>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="action-buttons">
          <button className="action-btn excel-upload-btn" onClick={handleExcelUpload}>
            📊 엑셀 일괄 업로드
          </button>
          <button className="action-btn member-add-btn" onClick={handleAddMember}>
            구성원 등록
          </button>
          <button className="action-btn point-bulk-btn" onClick={handleBulkPoint}>
            포인트 일괄 지급
          </button>
        </div>
      </div>

      {/* 이름으로 보기 - 기존 테이블 */}
      {viewMode === "list" && (
        <table className="member-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>이름</th>
              <th>부서</th>
              <th>사원번호</th>
              <th>포인트</th>
              <th>입사일</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} onClick={() => handleRowClick(m.id)} style={{ cursor: "pointer" }}>
                <td onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selected.includes(m.id)}
                    onChange={() => handleSelect(m.id)}
                  />
                </td>
                <td>{m.name}</td>
                <td>{m.department}</td>
                <td>{m.empNo}</td>
                <td>{m.point}</td>
                <td>{m.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 부서별 보기 */}
      {viewMode === "department" && (
        <div className="department-view">
          {Object.entries(groupedByDepartment).map(([department, members]) => {
            const isCollapsed = collapsedDepts[department];
            return (
              <div key={department} className="department-section">
                <div 
                  className="department-header-compact" 
                  onClick={() => toggleDepartment(department)}
                >
                  <div className="department-toggle">
                    <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>▼</span>
                    <span className="department-title">{department}</span>
                    <span className="department-count">({members.length}명)</span>
                  </div>
                  <div className="department-total-points">
                    {members.reduce((sum, m) => sum + m.point, 0).toLocaleString()}P
                  </div>
                </div>
                
                {!isCollapsed && (
                  <div className="department-member-list">
                    {members.map(m => (
                      <div key={m.id} className="member-row-card" onClick={() => handleRowClick(m.id)}>
                        <div className="member-checkbox-area" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selected.includes(m.id)}
                            onChange={() => handleSelect(m.id)}
                          />
                        </div>
                        <div className="member-info">
                          <div className="member-name-primary">{m.name}</div>
                          <div className="member-details-row">
                            <span className="member-emp-info">사번: {m.empNo}</span>
                            <span className="member-join-info">입사: {m.joinDate}</span>
                            <span className="member-phone-info">연락처: {m.phone || '010-0000-0000'}</span>
                          </div>
                        </div>
                        <div className="member-point-display">
                          {m.point.toLocaleString()}P
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 포인트 일괄지급 모달 */}
      {showBulkModal && (
        <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
          <div className="bulk-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>포인트 일괄 지급</h3>
              <button className="close-btn" onClick={() => setShowBulkModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="selected-info">
                <span>선택된 구성원: <strong>{selected.length}명</strong></span>
              </div>

              <div className="date-section">
                <h4>기간 설정</h4>
                <div className="date-inputs">
                  <div>
                    <label>시작일:</label>
                    <input
                      type="date"
                      value={bulkPointData.startDate}
                      onChange={(e) => setBulkPointData({...bulkPointData, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label>종료일:</label>
                    <input
                      type="date"
                      value={bulkPointData.endDate}
                      onChange={(e) => setBulkPointData({...bulkPointData, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="quarter-section">
                <h4>분기 설정</h4>
                <select
                  value={bulkPointData.quarter}
                  onChange={(e) => setBulkPointData({...bulkPointData, quarter: e.target.value})}
                >
                  <option value="1분기">1분기</option>
                  <option value="2분기">2분기</option>
                  <option value="3분기">3분기</option>
                  <option value="4분기">4분기</option>
                </select>
              </div>

              <div className="point-section">
                <h4>포인트 선택</h4>
                <div className="point-buttons">
                  <button
                    className={`point-btn ${bulkPointData.pointAmount === 100000 ? 'selected' : ''}`}
                    onClick={() => handlePointAmountSelect(100000)}
                  >
                    10만
                  </button>
                  <button
                    className={`point-btn ${bulkPointData.pointAmount === 200000 ? 'selected' : ''}`}
                    onClick={() => handlePointAmountSelect(200000)}
                  >
                    20만
                  </button>
                  <button
                    className={`point-btn ${bulkPointData.pointAmount === 300000 ? 'selected' : ''}`}
                    onClick={() => handlePointAmountSelect(300000)}
                  >
                    30만
                  </button>
                </div>
                
                <div className="custom-input">
                  <label>수기 입력:</label>
                  <input
                    type="number"
                    value={bulkPointData.customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="포인트를 입력하세요"
                    min="1000"
                  />
                  <span>포인트</span>
                </div>
              </div>

              <div className="summary-section">
                <div className="summary-item">
                  <span>선택된 구성원:</span>
                  <span>{selected.length}명</span>
                </div>
                <div className="summary-item">
                  <span>지급 포인트:</span>
                  <span>{(bulkPointData.pointAmount || Number(bulkPointData.customAmount) || 0).toLocaleString()}포인트</span>
                </div>
                <div className="summary-item">
                  <span>총 지급 포인트:</span>
                  <span className="total-amount">
                    {((bulkPointData.pointAmount || Number(bulkPointData.customAmount) || 0) * selected.length).toLocaleString()}포인트
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowBulkModal(false)}>취소</button>
              <button className="issue-btn" onClick={handleFinalIssue}>최종 발급하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 구성원 등록 바텀시트 */}
      {showAddModal && (
        <div className="modal-overlay bottom-sheet" onClick={() => setShowAddModal(false)}>
          <div className="add-member-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>새 구성원 등록</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="add-member-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>이름 *</label>
                    <input
                      type="text"
                      value={newMemberData.name}
                      onChange={(e) => handleNewMemberChange('name', e.target.value)}
                      placeholder="구성원 이름을 입력하세요"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>부서 *</label>
                    <select
                      value={newMemberData.department}
                      onChange={(e) => handleNewMemberChange('department', e.target.value)}
                      className="form-select"
                    >
                      <option value="">부서를 선택하세요</option>
                      <option value="영업">영업</option>
                      <option value="개발">개발</option>
                      <option value="디자인">디자인</option>
                      <option value="마케팅">마케팅</option>
                      <option value="인사">인사</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>사원번호 *</label>
                    <input
                      type="text"
                      value={newMemberData.empNo}
                      onChange={(e) => handleNewMemberChange('empNo', e.target.value)}
                      placeholder="사원번호를 입력하세요"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>입사일 *</label>
                    <input
                      type="date"
                      value={newMemberData.joinDate}
                      onChange={(e) => handleNewMemberChange('joinDate', e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>연락처</label>
                    <input
                      type="tel"
                      value={newMemberData.phone}
                      onChange={(e) => handleNewMemberChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      value={newMemberData.email}
                      onChange={(e) => handleNewMemberChange('email', e.target.value)}
                      placeholder="example@company.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>아이디 (로그인 ID)</label>
                    <input
                      type="text"
                      value={newMemberData.userId}
                      onChange={(e) => handleNewMemberChange('userId', e.target.value)}
                      placeholder="이메일과 동일하게 설정됩니다"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label>초기 포인트</label>
                    <input
                      type="number"
                      value={newMemberData.point}
                      onChange={(e) => handleNewMemberChange('point', e.target.value)}
                      placeholder="0"
                      min="0"
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>취소</button>
              <button className="save-btn" onClick={handleSaveNewMember}>저장하기</button>
            </div>
          </div>
        </div>
      )}

      {/* 엑셀 업로드 모달 */}
      {showExcelModal && (
        <div className="modal-overlay" onClick={() => setShowExcelModal(false)}>
          <div className="excel-upload-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📊 엑셀 일괄 업로드</h3>
              <button className="close-btn" onClick={() => setShowExcelModal(false)}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="upload-info">
                <h4>업로드 안내</h4>
                <ul>
                  <li>엑셀 파일(.xlsx, .xls) 또는 CSV 파일(.csv)을 업로드할 수 있습니다.</li>
                  <li>첫 번째 행은 헤더로 인식되어 제외됩니다.</li>
                  <li>필수 컬럼: 이름, 부서, 사원번호, 입사일</li>
                  <li>선택 컬럼: 연락처, 이메일, 아이디, 초기포인트</li>
                </ul>
              </div>

              <div className="template-download">
                <button className="template-btn" onClick={handleDownloadTemplate}>
                  📥 업로드 템플릿 다운로드
                </button>
              </div>

              <div className="file-upload-section">
                <h4>파일 선택</h4>
                <div className="file-input-wrapper">
                  <input
                    type="file"
                    id="excel-file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="excel-file" className="file-select-btn">
                    📁 파일 찾기
                  </label>
                  {selectedFile && (
                    <div className="selected-file">
                      <span>선택된 파일: {selectedFile.name}</span>
                      <button 
                        className="remove-file-btn" 
                        onClick={() => setSelectedFile(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="upload-progress">
                  <h4>업로드 진행 중...</h4>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowExcelModal(false)} disabled={isUploading}>
                취소
              </button>
              <button 
                className="upload-btn" 
                onClick={handleFileUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? '업로드 중...' : '업로드 시작'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemberList;