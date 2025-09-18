import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { initialMembers } from "./utils/mockData";
import LoginPage from "./components/LoginPage";
import AdminLayout from "./components/AdminLayout";
import { ApiProvider } from "./context/ApiContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 개발용으로 true로 설정
  const [members, setMembers] = useState(initialMembers);
  const [companyPoints, setCompanyPoints] = useState(1500000); // 기업 보유포인트 (초기값: 150만P)

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAddMember = (newMember) => {
    const id = Math.max(...members.map(m => m.id)) + 1;
    setMembers([...members, { ...newMember, id }]);
  };

  const handleUpdateMember = (updatedMember) => {
    setMembers(members.map(m => 
      m.id === updatedMember.id ? updatedMember : m
    ));
  };

  // 구성원 포인트 회수 (기업 보유포인트로 반환)
  const handleRecoverPoints = (memberId, recoverAmount) => {
    setMembers(members.map(m =>
      m.id === memberId ? { ...m, point: m.point - recoverAmount } : m
    ));
    setCompanyPoints(prev => prev + recoverAmount);
  };

  // 기업 보유포인트 차감 (포인트 지급 시 사용)
  const handleDeductCompanyPoints = (amount) => {
    setCompanyPoints(prev => prev - amount);
  };

  return (
    <ApiProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route 
              path="/*" 
              element={
                isLoggedIn ? (
                  <AdminLayout
                    members={members}
                    setMembers={setMembers}
                    handleAddMember={handleAddMember}
                    handleUpdateMember={handleUpdateMember}
                    companyPoints={companyPoints}
                    handleRecoverPoints={handleRecoverPoints}
                    handleDeductCompanyPoints={handleDeductCompanyPoints}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;
