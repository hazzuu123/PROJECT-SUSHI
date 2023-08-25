import styles from './login.module.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { getInitialDataRequest, postLogin } from '../../apis/sushi'
import { useDispatch } from 'react-redux'
import { changeUser } from '../../store'
import axios from 'axios'


const Login = () => {
    const dispatch = useDispatch()
    const EmailRef = useRef()
    const navigate = useNavigate()


    //이메일, 패스워드
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const handleInputEmail = (event) => { setEmail(event.target.value) }
    const handleInputPassword = (event) => { setPassword(event.target.value) }

    /** 로그인 버튼 클릭 시 */
    const handleLogin = async (event) => {
        event.preventDefault();

        //여기에서 로그인 처리 로직을 구현
        const postData = {
            'email': email,
            'password': password,
        }
        try {
            const response = await postLogin(postData)
            console.log('로그인 요청 성공')
            if (response.data.status === 400) {
                // 로그인 실패 시 아이디 입력란에 자동 포커스 설정
                EmailRef.current.focus()

            } else {
                // 로그인 성공 시 

                // 토큰과 데이터를 저장
                const expiresIn = 60 * 60; // 토큰의 만료 60분
                const expirationTime = new Date().getTime() + expiresIn * 1000;

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('tokenExpiration', expirationTime)

                // 로그인이 되어있다면 서버로부터 초기 데이터를 가져온다

                getInitialData()

                //로그인 폼 초기화
                setEmail('')
                setPassword('')

                //메인화면으로 이동
                navigate("/", { replace: true })

            }
        } catch {
            console.log('로그인 요청 실패')
        }

    }

    const getInitialData = async () => {
        try {
            const response = await getInitialDataRequest({
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            })
            console.log(response.data)
            dispatch(changeUser(
                {
                    email: response.data.email,
                    name: response.data.name,
                    location: response.data.location,
                    age: response.data.age
                }
            )) // store 변경
            console.log('불러오기 성공')


        } catch (error) {
            console.log('초기데이터 불러오기 실패 ')
        }
    }

    // 로그인 상태 확인 후 자동 로그아웃 처리
    useEffect(() => {
        const token = localStorage.getItem('token')
        const expirationTime = localStorage.getItem('tokenExpiration')

        if (token && expirationTime) {
            const currentTime = new Date().getTime();
            if (currentTime > Number(expirationTime)) {
                // 토큰 만료 시 자동 로그아웃
                localStorage.removeItem('token');
                localStorage.removeItem('tokenExpiration');
                dispatch(changeUser({ email: '', name: '', location: '', age: '' })) // store의 계정 데이터를 ''으로 초기화
                navigate('/login', { replace: true }); // 로그인 페이지로 이동
                EmailRef.current.focus()
            } else {
                // 중복로그인을 피하기 위해, 토큰 유효한 경우 로그인 페이지로 이동하지 않음
                navigate('/', { replace: true });
            }
        }
        else {
            // 토큰이 없다면 로그인할 준비가 되어있으므로 이메일 입력란에 자동 포커스를 준다
            EmailRef.current.focus()
        }
    }, [])


    return (
        <div>
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