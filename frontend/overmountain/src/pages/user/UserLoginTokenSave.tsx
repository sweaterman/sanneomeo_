import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { isLoginCheck, loginState } from '@features/commonSlice/loginSlice';

function UserLoginTokenSave() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  // id 값을 로컬 스토리지에 저장
  localStorage.setItem('token', token || '');

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/`);
  }, [navigate]);

  return (
    <div>
      <h1>토큰 저장중</h1>
    </div>
  );
}

export default UserLoginTokenSave;
