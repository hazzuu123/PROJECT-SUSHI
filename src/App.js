import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import MapPage from './pages/map';
import MainPage from './pages/main';
import EnrollRestaurantPage from './pages/enroll-restaurant/enroll-restaurant';
import SearchRestaurantPage from './pages/search-restaurant/search-restaurant';
import { Detail } from './pages/sushi-detail/sushi-detail';
import { SushiListPage } from './pages/sushi-list/sushi-list';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Logout from './pages/login/logout';
import DeleteAccount from './pages/delete-account/delete-account';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { postLogin } from './apis/sushi';
import { changeUser } from './store';
import getInitialData from './utils/getInitialData.js';
export default function App() {

  let userData = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log(userData)

  useEffect(() => {
    // 로그인 상태 확인 후 초기 데이터 가져오기
    if (localStorage.getItem('token')) {

      if (userData.email !== "") return

      getInitialData(dispatch) // 로그인이 되어있다면 서버로부터 초기데이터를 가져옴
    }
  }, [dispatch])

  return (
    <div className='App min-h-screen bg-bg'>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/sushi-list" element={<SushiListPage />}></Route>
        <Route path="/sushi-list/:id" element={<Detail></Detail>}></Route>
        <Route path="/enroll-restaurant" element={<EnrollRestaurantPage />}></Route>
        <Route path="/search-restaurant" element={<SearchRestaurantPage />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout></Logout>}></Route>
        <Route path="/delete-account" element={<DeleteAccount></DeleteAccount>}></Route>
        <Route path="/delete-success" element={<div>회원탈퇴가 완료되었습니다.</div>}></Route>

      </Routes>
    </div>
  )
}
