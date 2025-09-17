import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usageData } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function SettlementDetail() {
  const { month } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 해당 월의 사용 데이터 필터링 (실제로는 API에서 가져옴)
  const monthlyUsage = usageData.filter(usage => 
    usage.usageDate.startsWith(month)
  );

  const totalUsage = monthlyUsage.reduce((sum, usage) => sum + usage.points, 0);
  const totalAmount = monthlyUsage.reduce((sum, usage) => sum + usage.amount, 0);

  // 시설별 사용량 집계
  const facilityUsage = monthlyUsage.reduce((groups, usage) => {
    const facility = usage.facility;
    if (!groups[facility]) {
      groups[facility] = { count: 0, points: 0, amount: 0 };
    }
    groups[facility].count += 1;
    groups[facility].points += usage.points;
    groups[facility].amount += usage.amount;
    return groups;
  }, {});

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{month} 정산 상세</h2>
        <p>해당 월의 상세 이용 내역을 확인할 수 있습니다</p>
      </div>

      <div className="card" style={{ marginBottom: 'var(--spacing-6)' }}>
        <div className="card-content">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/charge', { 
              state: { activeTab: location.state?.activeTab || 'charge' } 
            })}
          >
            ← 돌아가기
          </button>
        </div>
      </div>

      <div className="settlement-detail-grid">
        <div className="card detail-card">
          <div className="metric-label">총 사용 포인트</div>
          <div className="metric-value">{formatNumber(totalUsage)}P</div>
        </div>
        <div className="card detail-card">
          <div className="metric-label">총 사용 금액</div>
          <div className="metric-value">{formatNumber(totalAmount)}원</div>
        </div>
        <div className="card detail-card">
          <div className="metric-label">이용 건수</div>
          <div className="metric-value">{monthlyUsage.length}건</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>시설별 사용 현황</h3>
        </div>
        <div className="card-content">
          <div className="stats-grid">
            {Object.entries(facilityUsage).map(([facility, data]) => (
              <div key={facility} className="card">
                <div className="card-header">
                  <h4>{facility}</h4>
                </div>
                <div className="card-content">
                  <div className="summary-list">
                    <div className="summary-item">
                      <span>이용 건수</span>
                      <span>{data.count}건</span>
                    </div>
                    <div className="summary-item">
                      <span>사용 포인트</span>
                      <span>{formatNumber(data.points)}P</span>
                    </div>
                    <div className="summary-item">
                      <span>사용 금액</span>
                      <span>{formatNumber(data.amount)}원</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>상세 이용 내역</h3>
        </div>
        <div className="card-content">
          <table className="table">
            <thead>
              <tr>
                <th>일자</th>
                <th>구성원</th>
                <th>부서</th>
                <th>시설</th>
                <th>포인트</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              {monthlyUsage.map(usage => (
                <tr key={usage.id}>
                  <td>{usage.usageDate}</td>
                  <td>{usage.memberName}</td>
                  <td>{usage.department}</td>
                  <td>{usage.facility}</td>
                  <td>{formatNumber(usage.points)}P</td>
                  <td>{formatNumber(usage.amount)}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SettlementDetail;














