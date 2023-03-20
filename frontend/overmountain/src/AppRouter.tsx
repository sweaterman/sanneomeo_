import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from '@components/common/Footer';
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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
      <Header />
        <Route path="/" element={<MainPage />} />
        <Route path="/mountain/detail" element={<MountainDetail />} />
        <Route path="/mountain/upload" element={<UploadPhoto />} />
        <Route path="/recommend/question" element={<RecomQuestion />} />
        <Route path="/recommend/result" element={<RecomResult />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/mypage" element={<UserMypage />} />
        <Route path="/user/wishlist" element={<UserWishList />} />
        <Route path="/user/challenge" element={<UserChallenge />} />
      <Footer />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
