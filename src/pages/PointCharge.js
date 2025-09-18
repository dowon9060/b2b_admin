import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { settlementData } from '../utils/mockData';
import { formatNumber } from '../utils/pointUtils';
import '../App.css';

function PointCharge() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('charge');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isCharging, setIsCharging] = useState(false);

  // 페이지 로드 시 state에서 활성 탭 확인
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const presetAmounts = [50000, 100000, 200000, 500000, 1000000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(prev => prev + amount); // 금액 누적
    setCustomAmount('');
  };

  const handleResetAmount = () => {
    setSelectedAmount(0);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCustomAmount(value);
    setSelectedAmount(parseInt(value) || 0);
  };

  const handleCharge = async () => {
    if (selectedAmount < 10000) {
      alert('최소 충전 금액은 10,000원입니다.');
      return;
    }

    setIsCharging(true);
    
    // 실제 앱에서는 결제 API 호출
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 시뮬레이션
      alert(`${selectedAmount.toLocaleString()}원이 성공적으로 충전되었습니다!`);
      setSelectedAmount(0);
      setCustomAmount('');
    } catch (error) {
      alert('충전 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsCharging(false);
    }
  };

  const renderChargeTab = () => (
    <>
      <div className="card">
        <div className="card-header">
          <h3>충전 금액 선택</h3>
        </div>
        <div className="card-content">
          <div className="charge-controls">
            <div className="button-group">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  className="btn btn-secondary"
                  onClick={() => handleAmountSelect(amount)}
                >
                  +{amount.toLocaleString()}원
                </button>
              ))}
            </div>
            <div className="amount-controls">
              <div className="current-amount">
                현재 선택된 금액: <span className="amount-value">{selectedAmount.toLocaleString()}원</span>
              </div>
              <button 
                className="btn btn-outline"
                onClick={handleResetAmount}
                disabled={selectedAmount === 0}
              >
                초기화
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="customAmount">직접 입력</label>
            <input
              id="customAmount"
              type="text"
              placeholder="최소 10,000원"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>결제 방법</h3>
        </div>
        <div className="card-content">
          <div className="radio-group">
            <label className="radio-option">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>신용카드</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>계좌이체</span>
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="payment"
                value="virtual"
                checked={paymentMethod === 'virtual'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>가상계좌</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>충전 요약</h3>
        </div>
        <div className="card-content">
          <div className="summary-list">
            <div className="summary-item">
              <span>충전 금액</span>
              <span className="amount">{selectedAmount.toLocaleString()}원</span>
            </div>
            <div className="summary-item total">
              <span>적립 포인트</span>
              <span className="total-points">{selectedAmount.toLocaleString()}P</span>
            </div>
          </div>

          <button 
            className="btn btn-primary btn-large"
            onClick={handleCharge}
            disabled={isCharging || selectedAmount < 10000}
          >
            {isCharging ? '충전 중...' : '충전하기'}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>이용 안내</h3>
        </div>
        <div className="card-content">
          <ul>
            <li>최소 충전 금액은 10,000원입니다.</li>
            <li>충전된 포인트는 유효기간 없이 사용 가능합니다.</li>
            <li>신용카드 충전 시 포인트는 즉시 반영됩니다.</li>
            <li>계좌이체는 입금 내역 확인 후 포인트가 적립되며, 처리까지 일정 시간이 소요될 수 있습니다.</li>
            <li>가상계좌는 입금 확인 후 자동으로 포인트가 적립됩니다.</li>
            <li>환불은 미사용 포인트에 한해 가능합니다.</li>
          </ul>
        </div>
      </div>
    </>
  );

  const renderHistoryTab = () => (
    <>
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
          <div className="stat-label">총 임직원</div>
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
                    <th>이용 임직원</th>
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
                      onClick={() => navigate(`/charge/history/${item.month}`, { 
                        state: { activeTab: 'history' } 
                      })}
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
    </>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>포인트</h2>
        <p>포인트를 충전하고 사용 내역을 관리할 수 있습니다</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card">
        <div className="card-content">
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'charge' ? 'active' : ''}`}
              onClick={() => setActiveTab('charge')}
            >
              충전하기
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              내역관리
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === 'charge' ? renderChargeTab() : renderHistoryTab()}
    </div>
  );
}

export default PointCharge;
