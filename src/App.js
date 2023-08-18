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
export default function App() {

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
