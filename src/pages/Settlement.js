import React from "react";
import { useNavigate } from "react-router-dom";
import { settlementData } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function Settlement() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>정산</h2>
      </div>
      
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">이번 달 사용량</div>
          <div className="stat-value">{formatNumber(450000)}P</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">평균 사용량</div>
          <div className="stat-value">{formatNumber(416667)}P</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">총 구성원</div>
          <div className="stat-value">48명</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>월별 정산 내역</h3>
        </div>
        <div className="card-content">
          <table className="table">
            <thead>
              <tr>
                <th>정산월</th>
                <th>총 사용량</th>
                <th>이용 구성원</th>
                <th>평균 사용량</th>
                <th>상태</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {settlementData.map(item => (
                <tr key={item.id}>
                  <td>{item.month}</td>
                  <td>{formatNumber(item.totalUsage)}P</td>
                  <td>{item.memberCount}명</td>
                  <td>{formatNumber(item.avgUsage)}P</td>
                  <td>
                    <span className={`badge ${item.status === '완료' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/settlement/${item.month}`)}
                    >
                      상세보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settlement;














