import React, { useState } from "react";
import { departments } from "../utils/mockData";
import { formatNumber } from "../utils/pointUtils";

function GiftPage({ members, setMembers }) {
  const [availablePoints, setAvailablePoints] = useState(500000); // 선물 가능한 포인트
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("전체");
  const [selectedGifts, setSelectedGifts] = useState({}); // 각 구성원별 선물할 포인트

  // 필터링
  const filtered = members.filter(
    m =>
      (dept === "전체" || m.department === dept) &&
      m.name.includes(search)
  );

  // 선물 포인트 변경
  const handleGiftChange = (memberId, points) => {
    setSelectedGifts({
      ...selectedGifts,
      [memberId]: Number(points) || 0
    });
  };

  // 선물하기 실행
  const handleSendGift = (memberId) => {
    const giftPoints = selectedGifts[memberId] || 0;
    if (giftPoints <= 0) {
      alert("선물할 포인트를 입력해주세요.");
      return;
    }
    if (giftPoints > availablePoints) {
      alert("선물 가능한 포인트가 부족합니다.");
      return;
    }

    // 구성원에게 포인트 선물
    setMembers(members =>
      members.map(m =>
        m.id === memberId ? { ...m, point: m.point + giftPoints } : m
      )
    );

    // 선물 가능한 포인트 차감
    setAvailablePoints(prev => prev - giftPoints);

    // 선물 내역 초기화
    setSelectedGifts({
      ...selectedGifts,
      [memberId]: 0
    });

    const member = members.find(m => m.id === memberId);
    alert(`${member.name}님에게 ${formatNumber(giftPoints)}포인트를 선물했습니다!`);
  };

  // 총 선물 예정 포인트 계산
  const totalGiftPoints = Object.values(selectedGifts).reduce((sum, points) => sum + (points || 0), 0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>선물하기</h2>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3>포인트 현황</h3>
        </div>
        <div className="card-content">
          <div className="point-info">
            <div className="point-item">
              <span className="label">선물 가능한 포인트:</span>
              <span className="value">{formatNumber(availablePoints)}P</span>
            </div>
            {totalGiftPoints > 0 && (
              <>
                <div className="point-item preview">
                  <span className="label">선물 예정:</span>
                  <span className="value preview-highlight">{formatNumber(totalGiftPoints)}P</span>
                </div>
                <div className="point-item after">
                  <span className="label">선물 후 잔여:</span>
                  <span className="value after-highlight">{formatNumber(availablePoints - totalGiftPoints)}P</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>구성원 검색</h3>
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
            <select value={dept} onChange={e => setDept(e.target.value)} className="form-control">
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>구성원 목록</h3>
        </div>
        <div className="card-content">
          <table className="table">
            <thead>
              <tr>
                <th>이름</th>
                <th>부서</th>
                <th>사원번호</th>
                <th>현재 포인트</th>
                <th>입사일</th>
                <th>선물할 포인트</th>
                <th>선물하기</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td>{m.name}</td>
                  <td>{m.department}</td>
                  <td>{m.empNo}</td>
                  <td>{formatNumber(m.point)}P</td>
                  <td>{m.joinDate}</td>
                  <td>
                    <input
                      type="number"
                      value={selectedGifts[m.id] || ""}
                      onChange={(e) => handleGiftChange(m.id, e.target.value)}
                      placeholder="포인트"
                      min="0"
                      max={availablePoints}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleSendGift(m.id)}
                      disabled={!selectedGifts[m.id] || selectedGifts[m.id] <= 0}
                    >
                      선물
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

export default GiftPage;














