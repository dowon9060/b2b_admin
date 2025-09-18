import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MemberList from "../MemberList";
import MemberDetail from "../MemberDetail";
import GiftPage from "../pages/GiftPage";
import PointCharge from "../pages/PointCharge";
import Settlement from "../pages/Settlement";
import SettlementDetail from "../pages/SettlementDetail";
import UsageTable from "../pages/UsageTable";
import Settings from "../pages/Settings";
import DepartmentSettings from "../pages/DepartmentSettings";
import UserManagement from "../pages/UserManagement";

function AdminLayout({ members, setMembers, handleAddMember, handleUpdateMember, companyPoints, handleRecoverPoints, handleDeductCompanyPoints }) {
  const location = useLocation();
  const [departments, setDepartments] = useState([
    { id: 1, companyName: "도원컴퍼니", departmentName: "영업부", teamName: "영업1팀" },
    { id: 2, companyName: "도원컴퍼니", departmentName: "개발부", teamName: "프론트엔드팀" },
    { id: 3, companyName: "도원컴퍼니", departmentName: "영업부", teamName: "기업영업팀" },
    { id: 4, companyName: "테크노블", departmentName: "마케팅부", teamName: "디지털마케팅팀" },
    { id: 5, companyName: "테크노블", departmentName: "인사부", teamName: "채용팀" }
  ]);

  const handleAddDepartment = (newDept) => {
    const newId = Math.max(...departments.map(d => d.id)) + 1;
    setDepartments(prev => [...prev, { ...newDept, id: newId }]);
  };

  return (
    <div className="admin-layout">
      <header className="top-navbar">
        <nav>
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}>
              <Link to="/">홈</Link>
            </li>
            <li className={location.pathname.startsWith("/members") ? "active" : ""}>
              <Link to="/members">임직원관리</Link>
            </li>
            <li className={location.pathname.startsWith("/charge") ? "active" : ""}>
              <Link to="/charge">포인트</Link>
            </li>
            <li className={location.pathname.startsWith("/usage") ? "active" : ""}>
              <Link to="/usage">이용현황</Link>
            </li>
            <li className={location.pathname.startsWith("/gift") ? "active" : ""}>
              <Link to="/gift">선물하기</Link>
            </li>
            <li className={location.pathname.startsWith("/settings") ? "active" : ""}>
              <Link to="/settings">설정</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard members={members} />} />
          <Route path="/members" element={<MemberList members={members} setMembers={setMembers} />} />
          <Route path="/members/new" element={<MemberDetail members={members} onUpdate={handleAddMember} />} />
          <Route path="/members/:id" element={<MemberDetail members={members} setMembers={setMembers} onUpdate={handleUpdateMember} companyPoints={companyPoints} handleRecoverPoints={handleRecoverPoints} />} />
              <Route path="/gift" element={<GiftPage members={members} setMembers={setMembers} companyPoints={companyPoints} handleDeductCompanyPoints={handleDeductCompanyPoints} />} />
          <Route path="/charge" element={<PointCharge companyPoints={companyPoints} />} />
          <Route path="/charge/history/:month" element={<SettlementDetail />} />
          <Route path="/usage" element={<UsageTable />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/departments" element={
            <DepartmentSettings departments={departments} onAddDepartment={handleAddDepartment} />
          } />
          <Route path="/settings/users" element={<UserManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;

