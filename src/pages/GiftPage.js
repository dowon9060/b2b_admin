import React, { useState } from "react";
import { giftProducts, giftCategories, giftHistory, departments } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function GiftPage({ members, setMembers, companyPoints = 1500000, handleDeductCompanyPoints }) {
  const [activeTab, setActiveTab] = useState("products"); // "products" 또는 "history"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("전체");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [isGifting, setIsGifting] = useState(false);

  // 상품 필터링
  const filteredProducts = giftProducts.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  );

  // 수신자 필터링
  const filteredMembers = members.filter(
    m =>
      (dept === "전체" || m.department === dept) &&
      m.name.includes(search)
  );

  // 선물하기 모달 열기
  const handleOpenGiftModal = (product) => {
    if (companyPoints < product.points) {
      alert("보유 포인트가 부족합니다.");
      return;
    }
    setSelectedProduct(product);
    setSelectedRecipients([]);
    setShowRecipientModal(true);
  };

  // 수신자 선택/해제
  const handleToggleRecipient = (memberId) => {
    setSelectedRecipients(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  // 선물 전송
  const handleSendGift = async () => {
    if (selectedRecipients.length === 0) {
      alert("선물받을 임직원을 선택해주세요.");
      return;
    }

    const totalPoints = selectedProduct.points * selectedRecipients.length;
    if (totalPoints > companyPoints) {
      alert("보유 포인트가 부족합니다.");
      return;
    }

    setIsGifting(true);

    try {
      // 실제 앱에서는 선물 전송 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 포인트 차감
      handleDeductCompanyPoints(totalPoints);

      // 선물 내역 업데이트 (실제로는 서버에서 관리)
      alert(`${selectedRecipients.length}명에게 "${selectedProduct.name}"을 선물했습니다!`);
      
      setShowRecipientModal(false);
      setSelectedProduct(null);
      setSelectedRecipients([]);
    } catch (error) {
      alert("선물 전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setIsGifting(false);
    }
  };

  const renderProductsTab = () => (
    <>
      {/* 포인트 현황 */}
      <div className="card">
        <div className="card-header">
          <h3>보유 포인트</h3>
        </div>
        <div className="card-content">
          <div className="point-info">
            <div className="point-item">
              <span className="label">선물 가능한 포인트:</span>
              <span className="value">{formatNumber(companyPoints)}P</span>
            </div>
          </div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="card">
        <div className="card-content">
          <div className="category-filters">
            {giftCategories.map(category => (
              <button
                key={category.id}
                className={`btn ${selectedCategory === category.id ? "btn-primary" : "btn-secondary"}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 상품 그리드 */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="card product-card">
            <div className="product-image">
              <span className="product-emoji">{product.image}</span>
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-description">{product.description}</p>
              <div className="product-details">
                <div className="product-detail">
                  <span className="detail-label">이용시간:</span>
                  <span className="detail-value">{product.duration}</span>
                </div>
                <div className="product-detail">
                  <span className="detail-label">유효기간:</span>
                  <span className="detail-value">{product.validity}</span>
                </div>
              </div>
              <div className="product-footer">
                <div className="product-points">{formatNumber(product.points)}P</div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenGiftModal(product)}
                  disabled={companyPoints < product.points}
                >
                  선물하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderHistoryTab = () => (
    <div className="card">
      <div className="card-header">
        <h3>선물 내역</h3>
      </div>
      <div className="card-content">
        <table className="table">
          <thead>
            <tr>
              <th>선물일</th>
              <th>임직원</th>
              <th>부서</th>
              <th>상품명</th>
              <th>포인트</th>
              <th>상태</th>
              <th>사용여부</th>
            </tr>
          </thead>
          <tbody>
            {giftHistory.map(gift => (
              <tr key={gift.id}>
                <td>{gift.giftDate}</td>
                <td>{gift.memberName}</td>
                <td>{gift.memberDept}</td>
                <td>{gift.productName}</td>
                <td>{formatNumber(gift.points)}P</td>
                <td>
                  <span className={`status-badge ${gift.status === "전송완료" ? "success" : "pending"}`}>
                    {gift.status}
                  </span>
                </td>
                <td>
                  <span className={`usage-badge ${
                    gift.usageStatus === "사용완료" ? "completed" : 
                    gift.usageStatus === "사용중" ? "in-use" : "unused"
                  }`}>
                    {gift.usageStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>선물하기</h2>
        <p>임직원에게 다짐의 운동 상품을 선물하세요</p>
      </div>

      {/* 탭 네비게이션 */}
      <div className="card">
        <div className="card-content">
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              상품 선택
            </button>
            <button
              className={`tab-button ${activeTab === "history" ? "active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              선물 내역
            </button>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "products" && renderProductsTab()}
      {activeTab === "history" && renderHistoryTab()}

      {/* 수신자 선택 모달 */}
      {showRecipientModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowRecipientModal(false)}>
          <div className="card modal-card large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>선물 받을 임직원 선택</h3>
              <button className="btn btn-secondary" onClick={() => setShowRecipientModal(false)}>×</button>
            </div>

            <div className="card-content">
              {/* 선택된 상품 정보 */}
              <div className="card info-card">
                <div className="selected-product-info">
                  <span className="product-emoji-large">{selectedProduct.image}</span>
                  <div className="product-details-modal">
                    <h4>{selectedProduct.name}</h4>
                    <p>{selectedProduct.description}</p>
                    <div className="product-meta">
                      <span>{selectedProduct.duration}</span>
                      <span>유효기간: {selectedProduct.validity}</span>
                      <span className="points-large">{formatNumber(selectedProduct.points)}P</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 임직원 검색 */}
              <div className="form-row">
                <input
                  type="text"
                  placeholder="임직원 이름 검색"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="form-control"
                />
                <select value={dept} onChange={e => setDept(e.target.value)} className="form-control">
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* 임직원 목록 */}
              <div className="recipients-list">
                {filteredMembers.map(member => (
                  <div 
                    key={member.id} 
                    className={`recipient-item ${selectedRecipients.includes(member.id) ? "selected" : ""}`}
                    onClick={() => handleToggleRecipient(member.id)}
                  >
                    <div className="recipient-info">
                      <div className="recipient-name">{member.name}</div>
                      <div className="recipient-dept">{member.department}</div>
                    </div>
                    <div className="recipient-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedRecipients.includes(member.id)}
                        onChange={() => handleToggleRecipient(member.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* 선물 요약 */}
              {selectedRecipients.length > 0 && (
                <div className="card gift-summary">
                  <h4>선물 요약</h4>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <span className="label">선택된 임직원:</span>
                      <span className="value">{selectedRecipients.length}명</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">상품당 포인트:</span>
                      <span className="value">{formatNumber(selectedProduct.points)}P</span>
                    </div>
                    <div className="summary-item total">
                      <span className="label">총 포인트:</span>
                      <span className="value">{formatNumber(selectedProduct.points * selectedRecipients.length)}P</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">선물 후 잔여 포인트:</span>
                      <span className="value">{formatNumber(companyPoints - (selectedProduct.points * selectedRecipients.length))}P</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowRecipientModal(false)}
                disabled={isGifting}
              >
                취소
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSendGift}
                disabled={isGifting || selectedRecipients.length === 0}
              >
                {isGifting ? "선물 전송 중..." : `${selectedRecipients.length}명에게 선물하기`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GiftPage;














