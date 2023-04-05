import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@components/common/Header';
import MainPage from '@pages/main/MainPage';
import MountainDetail from '@pages/mountain/MountainDetail';
import UploadPhoto from '@pages/mountain/UploadPhoto';
import RecomQuestion from '@pages/recommend/RecomQuestion';
import RecomResult from '@pages/recommend/RecomResult';
import UserChallenge from '@pages/user/UserChallenge';
import UserLogin from '@pages/user/UserLogin';
import UserMypage from '@pages/user/UserMypage';
import UserWishList from '@pages/user/UserWishlist';
import MountainTrail from '@pages/mountain/MountainTrail';
import UserLoginTokenSave from '@pages/user/UserLoginTokenSave';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/mountain/detail/:mountainSeq"
          element={<MountainDetail />}
        />
        <Route path="/mountain/upload" element={<UploadPhoto />} />
        <Route path="/mountain/trail/:trailSeq" element={<MountainTrail />} />
        <Route path="/recommend/question" element={<RecomQuestion />} />
        <Route path="/recommend/result" element={<RecomResult />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/mypage" element={<UserMypage />} />
        <Route path="/user/wishlist" element={<UserWishList />} />
        <Route path="/user/challenge" element={<UserChallenge />} />

        {/* 로그인 토큰 저장용 */}
        <Route path="/user/login/callback" element={<UserLoginTokenSave />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
