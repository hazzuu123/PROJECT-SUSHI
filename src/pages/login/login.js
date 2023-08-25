import { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { postLogin } from '../../apis/sushi'
import { changeUser } from '../../store'
import autoLogout from '../../utils/autoLogout.js'
import getInitialData from '../../utils/getInitialData.js'
import styles from './login.module.css'


const Login = () => {
    //이메일, 패스워드
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const EmailRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputEmail = (event) => { setEmail(event.target.value) }
    const handleInputPassword = (event) => { setPassword(event.target.value) }

    /** 로그인 버튼 클릭 시 */
    const handleLogin = async (event) => {
        event.preventDefault()

        //여기에서 로그인 처리 로직을 구현
        const postData = {
            'email': email,
            'password': password,
        }
        try {
            const response = await postLogin(postData)
            if (response.data.status === 400) {
                // 로그인 실패 시 아이디 입력란에 자동 포커스 설정
                EmailRef.current.focus()
            } else {
                // 로그인 성공 시 아래의 로직을 처리

                // 토큰과 데이터를 저장
                const expiresIn = 1 * 60; // 토큰의 만료 60분
                const expirationTime = new Date().getTime() + expiresIn * 1000;

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('tokenExpiration', expirationTime)

                //서버로부터 초기 데이터를 가져온다
                getInitialData(dispatch)    // app.js에서 props로 가져옴

                //로그인 폼 초기화
                setEmail('')
                setPassword('')

                //메인화면으로 이동
                navigate("/", { replace: true })
            }
        } catch (error) {
            console.log('로그인 요청 실패')
        }

    }


    // 로그인 상태 확인 후 자동 로그아웃 처리
    useEffect(() => {
        autoLogout({ dispatch, navigate })
    }, [dispatch, navigate])


    return (
        <div>
            <h2>로그인 페이지</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">ID </label>
                    <input
                        type='text'
                        id='email'
                        placeholder='Email'
                        value={email}
                        onChange={handleInputEmail}
                        ref={EmailRef} //아이디 입력란에 자동 포커스를 설정
                    />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='Password'
                        value={password}
                        onChange={handleInputPassword}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login