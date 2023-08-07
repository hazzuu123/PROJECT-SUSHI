import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import './App.css'
import SushiListPage from './pages/sushi-list';
import MapPage from './pages/map';
import MainPage from './pages/main';
import EnrollRestaurantPage from './pages/enroll-restaurant/enroll-restaurant';
import SearchRestaurantPage from './pages/search-restaurant/search-restaurant';
export default function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/sushi-list" element={<SushiListPage />}></Route>
        <Route path="/enroll-restaurant" element={<EnrollRestaurantPage />}></Route>
        <Route path="/search-restaurant" element={<SearchRestaurantPage />}></Route>
      </Routes>

    </div>
  )
}
