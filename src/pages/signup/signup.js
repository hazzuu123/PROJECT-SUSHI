import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from './signup.module.css'
import { postSignup } from "../../apis/sushi"

/** 회원가입 페이지 */
const Signup = () => {
    const EmailRef = useRef()

    //이메일, 패스워드, 이름, 지역, 나이
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('')



    // 새로고침할 때마다 이메일 입력란에 자동 포커스를 준다
    useEffect(() => {
        EmailRef.current.focus()
    }, [])


    const handleInputEmail = (event) => { setEmail(event.target.value) }
    const handleInputPassword = (event) => { setPassword(event.target.value) }
    const handleInputName = (event) => { setName(event.target.value) }
    const handleInputLocation = (event) => { setLocation(event.target.value) }
    const handleInputAge = (event) => { setAge(event.target.value) }

    /** 로그인 버튼 클릭 시 */
    const handleSignup = async (event) => {
        event.preventDefault();

        //여기에서 로그인 처리 로직을 구현
        const postData = {
            'email': email,
            'password': password,
            'name': name,
            'location': location,
            'age': parseInt(age)
        }

        try {
            const response = await postSignup(postData)
            console.log('회원가입 요청 성공')
        } catch {
            console.log('회원가입 요청 실패')
        }
    }

    return (
        <div>
            <form onSubmit={handleSignup}>
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
                </div><div>
                    <label htmlFor="name">Name </label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Name'
                        value={name}
                        onChange={handleInputName}
                    />
                </div><div>
                    <label htmlFor="location">Location </label>
                    <input
                        type='text'
                        id='location'
                        placeholder='Location'
                        value={location}
                        onChange={handleInputLocation}
                    />
                </div><div>
                    <label htmlFor="age">AGE </label>
                    <input
                        type='text'
                        id='age'
                        placeholder='age'
                        value={age}
                        onChange={handleInputAge}

                    />
                </div>

                <button type="submit">Signup</button>

            </form >
        </div >
    )
}

export default Signup