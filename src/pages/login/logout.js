import styles from './logout.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../store';
import { useEffect } from 'react';
const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        // store.js 의 계정 데이터를 ''으로 초기화
        dispatch(changeUser({ email: '', name: '', location: '', age: '' }))
        // localStorage 삭제
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
        }
        // Login 페이지로 이동
        navigate('/login', { replace: true })
    })
}
export default Logout;