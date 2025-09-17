import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 인증 로직은 추후 구현
    if (userId && password) {
      onLogin();
      navigate("/");
    } else {
      alert("아이디와 패스워드를 입력하세요");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userId">아이디</label>
          <input 
            id="userId" 
            type="text" 
            placeholder="아이디 입력" 
            value={userId} 
            onChange={e => setUserId(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="password">패스워드</label>
          <input 
            id="password" 
            type="password" 
            placeholder="패스워드 입력" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <label>
            <input type="checkbox" /> 아이디 저장(기억)
          </label>
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default LoginPage;







