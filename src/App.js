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
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { postLogin } from './apis/sushi';
import { changeUser } from './store';
export default function App() {

  const [intialData, setInitialData] = useState(null)
  let userData = useSelector((state) => state.user)
  const dispatch = useDispatch()
  console.log(userData)

  useEffect(() => {
    // 로그인 상태 확인 후 초기 데이터 가져오기
    if (localStorage.getItem('token')) {
      // 리덕스에 userData 가 있는 경우 초기 데이터 가져오기 생략
      if (userData.email !== "") {
        return
      }

      // 로그인이 되어있다면 서버로부터 초기 데이터를 가져온다
      const getInitialData = async () => {

        try {
          const response = await axios.get('/api/get-initial-data', {
            headers: {
              Authorization: `${localStorage.getItem('token')}`
            },
          })
          setInitialData(response.data)
          console.log(response.data)
        } catch (error) {
          console.log('초기데이터 불러오기 실패: ')
        }
      }
      getInitialData()
      dispatch(changeUser({ email: 'iiujj', name: 'name', location: 'location', age: 'age' })) // store 변경
      // store.js 에 initialData 를 저장한다.
      // {email: '',
      // password: '',
      // name: '',
      // location: '',
      // age: ''}
    }
  }, [])


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

      </Routes>
    </div>
  )
}
