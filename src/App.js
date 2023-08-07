import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';
import './App.css'
import SushiListPage from './pages/sushi-list';
import MapPage from './pages/map';

export default function App() {
  /** 초밥집 등록 */
  // useEffect(() => {
  //   const postData = {
  //     name: '초밥',
  //     menus: [{
  //       name: '연어초밥',
  //       price: '20000원'
  //     }],
  //     location: '테헤란로 52',
  //     phone: '010 - 1234 - 1235'
  //   }
  //   axios.post('http://146.56.180.210:3200/sushi', postData)
  //     .then(respose => console.log(respose.data))
  //     .catch(error => console.log('Error:', error));

  // }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<MapPage/>}></Route>
        <Route path="/sushi-list" element={<SushiListPage/>} />
      </Routes>

    </div>
  )
}
