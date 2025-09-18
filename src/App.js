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
