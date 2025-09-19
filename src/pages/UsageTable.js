import React, { useState } from "react";
import { usageData, departments } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function UsageTable() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("전체");
  const [quarter, setQuarter] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" 또는 "department"
  const [collapsedDepts, setCollapsedDepts] = useState({}); // 접힌 부서들

  const toggleDepartment = (department) => {
    setCollapsedDepts(prev => ({
      ...prev,
      [department]: !prev[department]
    }));
  };

  // 필터링 로직
  const filtered = usageData.filter(usage => {
    let matches = true;

    // 검색어 필터
    if (search && !usage.memberName.includes(search)) {
      matches = false;
    }

    // 부서 필터
    if (dept !== "전체" && usage.department !== dept) {
      matches = false;
    }

    // 분기 필터
    if (quarter !== "전체") {
      const usageMonth = new Date(usage.usageDate).getMonth() + 1;
      let quarterMonths = [];
      if (quarter === "1분기") quarterMonths = [1, 2, 3];
      else if (quarter === "2분기") quarterMonths = [4, 5, 6];
      else if (quarter === "3분기") quarterMonths = [7, 8, 9];
      else if (quarter === "4분기") quarterMonths = [10, 11, 12];
      
      if (!quarterMonths.includes(usageMonth)) {
        matches = false;
      }
    }

    // 날짜 범위 필터
    if (startDate && usage.usageDate < startDate) {
      matches = false;
    }
    if (endDate && usage.usageDate > endDate) {
      matches = false;
    }

    return matches;
  });

  // 부서별 그룹화
  const groupedByDepartment = filtered.reduce((groups, usage) => {
    const dept = usage.department;
    if (!groups[dept]) {
      groups[dept] = [];
    }
    groups[dept].push(usage);
    return groups;
  }, {});

  const handleReset = () => {
    setSearch("");
    setDept("전체");
    setQuarter("전체");
    setStartDate("");
    setEndDate("");
  };

  // 이용권 기간 계산 함수
  const getUsagePeriod = (usageDate, points) => {
    const startDate = new Date(usageDate);
    let days = 30; // 기본 30일

    // 포인트에 따른 이용 기간 설정
    if (points >= 50000) days = 90; // 3개월
    else if (points >= 40000) days = 60; // 2개월
    else if (points >= 30000) days = 30; // 1개월
    else days = 7; // 1주일

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days);

    return `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>이용현황</h2>
      </div>

      <div className="card view-mode-card">
        <button
          className={`btn ${viewMode === "list" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setViewMode("list")}
        >
          이름으로 보기
        </button>
        <button
          className={`btn ${viewMode === "department" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setViewMode("department")}
        >
          부서별 보기
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>검색 및 필터</h3>
        </div>
        <div className="card-content">
          <div className="form-row">
            <input
              type="text"
              placeholder="구성원 이름 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-row">
            <select value={dept} onChange={e => setDept(e.target.value)} className="form-control">
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            
            <select value={quarter} onChange={e => setQuarter(e.target.value)} className="form-control">
              <option value="전체">전체</option>
              <option value="1분기">1분기</option>
              <option value="2분기">2분기</option>
              <option value="3분기">3분기</option>
              <option value="4분기">4분기</option>
            </select>
            
            <button onClick={handleReset} className="btn btn-secondary">
              초기화
            </button>
          </div>

          <div className="form-group">
            <label>기간 지정</label>
            <div className="date-range-row">
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="form-control"
                placeholder="시작일"
              />
              <span className="date-separator">~</span>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="form-control"
                placeholder="종료일"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 이름으로 보기 - 기존 테이블 */}
      {viewMode === "list" && (
        <div className="card">
          <div className="card-header">
            <h3>이용 내역</h3>
          </div>
          <div className="card-content">
            <table className="table usage-table">
              <thead>
                <tr>
                  <th>구성원</th>
                  <th>부서</th>
                  <th>이용기간</th>
                  <th>포인트</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(usage => (
                  <tr key={usage.id}>
                    <td>{usage.memberName}</td>
                    <td>{usage.department}</td>
                    <td className="usage-period-cell">{getUsagePeriod(usage.usageDate, usage.points)}</td>
                    <td>{formatNumber(usage.points)}P</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 부서별 보기 */}
      {viewMode === "department" && (
        <div className="card">
          <div className="card-content">
            {Object.entries(groupedByDepartment).map(([department, usages]) => {
              const isCollapsed = collapsedDepts[department];
              const deptTotalPoints = usages.reduce((sum, usage) => sum + usage.points, 0);
              
              return (
                <div key={department} className="card department-card">
                  <div 
                    className="card-header department-header" 
                    onClick={() => toggleDepartment(department)}
                  >
                    <div className="department-info">
                      <span className={`toggle-icon ${isCollapsed ? 'collapsed' : ''}`}>▼</span>
                      <span className="department-title">{department}</span>
                      <span className="department-count">({usages.length}건)</span>
                    </div>
                    <div className="department-total">
                      {formatNumber(deptTotalPoints)}P
                    </div>
                  </div>
                  
                  {!isCollapsed && (
                    <div className="card-content">
                      {usages.map(usage => (
                        <div key={usage.id} className="card usage-card">
                          <div className="usage-period">{getUsagePeriod(usage.usageDate, usage.points)}</div>
                          <div className="usage-info">
                            <div className="usage-member">{usage.memberName}</div>
                            <div className="usage-details">
                              <span>포인트: {formatNumber(usage.points)}P</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default UsageTable;














