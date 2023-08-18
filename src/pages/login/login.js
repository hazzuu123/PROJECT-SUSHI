import styles from './login.module.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { postLogin } from '../../apis/sushi'

const Login = () => {
    const EmailRef = useRef()
    const navigate = useNavigate()

    //이메일, 패스워드
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // 새로고침할 때마다 이메일 입력란에 자동 포커스를 준다
    useEffect(() => {
        EmailRef.current.focus()
    }, [])

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
                const expiresIn = 1 * 1; // 토큰의 만료 1분
                const expirationTime = new Date().getTime() + expiresIn * 1000;

                localStorage.setItem('token', response.data.token)
                localStorage.setItem('tokenExpiration', expirationTime)

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
                navigate('/login', { replace: true }); // 로그인 페이지로 이동
            } else {
                // 중복로그인을 피하기 위해, 토큰 유효한 경우 로그인 페이지로 이동하지 않음
                navigate('/', { replace: true });
            }
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