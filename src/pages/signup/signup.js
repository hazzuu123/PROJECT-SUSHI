import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from './signup.module.css'
import { postSignup, checkUpDuplicateRequest } from "../../apis/sushi"
import DaumPostcode from "react-daum-postcode"

/** 회원가입 페이지 */
const Signup = () => {
    const EmailRef = useRef()
    const navigate = useNavigate()

    //이메일, 패스워드, 이름, 지역, 나이
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [age, setAge] = useState('')

    const handleInputEmail = (event) => { setEmail(event.target.value) }
    const handleInputPassword = (event) => { setPassword(event.target.value) }
    const handleInputConfirmPassword = (event) => { setConfirmPassword(event.target.value) }
    const handleInputName = (event) => { setName(event.target.value) }
    const handleInputLocation = (event) => { setLocation(event.target.value) }
    const [openPostcode, setOpenPostcode] = useState(false) // 주소 검색 창 띄우기
    const handleInputAge = (event) => { console.log(event.target.value); setAge(event.target.value) }






    /** 로그인이 되어있다면 회원가입을 못하도록 설정 */
    useEffect(() => {
        const token = localStorage.getItem('token')
        // 토큰이 유효한 경우 회원가입 페이지로 이동하지 않음
        if (token) {
            navigate('/', { replace: true })
        }
        else { // 토큰이 없다면 회원가입할 준비가 되어있으므로 이메일 입력란에 자동 포커스
            EmailRef.current.focus()
        }
    }, [])

    /** 회원가입 버튼 클릭 시 */
    const handleSignup = async (event) => {
        event.preventDefault();

        // 회원가입 폼을 모두 작성하지 않은 경우
        if (email === '' || password === '' || confirmPassword === '' || name === '' || location === '' || age === '') {
            return
        }

        // 패스워드와 확인 패스워드가 일치하지 않을 경우
        if (password !== confirmPassword) {
            return;
        }

        // 나이를 숫자로 입력하지 않은 경우
        if (isNaN(age)) {

        }


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

    /** 아이디 중복 검사  */
    const checkUpDuplicate = async () => {
        const postData = {
            'email': email,
        }
        // 이메일을 입력하지 않았다면 
        if (email === '') {
            EmailRef.current.focus()
            return
        }
        try {
            const response = await checkUpDuplicateRequest(postData)
            console.log('중복검사 요청 성공', response.data)
            if (response.data.isExist) {
                setEmail('')
                EmailRef.current.focus()
            }
        } catch {
            console.log('중복검사 요청 실패')
        }
    }

    /** 주소 검색을 눌렀을 때 */
    const handleClickButton = (event) => {
        event.preventDefault()
        setOpenPostcode(!openPostcode)
    }

    // 우편번호 검색 결과 목록을 클릭했을 때 실행되는 콜백 함수
    const selectAddress = (data) => {
        console.log(data.roadAddress)
        setLocation(data.roadAddress)
        setOpenPostcode(false)
    }
    return (
        <div>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">이메일 </label>
                    <input
                        type='text'
                        id='email'
                        placeholder='xxxx@naver.com'
                        value={email}
                        onChange={handleInputEmail}
                        ref={EmailRef} //아이디 입력란에 자동 포커스를 설정
                    />
                    <button type="button" onClick={checkUpDuplicate}>중복확인</button>
                </div>
                <div>
                    <label htmlFor="password">비밀번호 </label>
                    <input
                        type='password'
                        id='password'
                        placeholder='비밀번호를 입력합니다'
                        value={password}
                        onChange={handleInputPassword}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 재확인 </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        placeholder='비밀번호를 재확인합니다'
                        value={confirmPassword}
                        onChange={handleInputConfirmPassword}
                    />
                    {(password !== confirmPassword) && (
                        <p className={styles.errorMessage}>비밀번호가 일치하지 않습니다</p>
                    )}
                </div>
                <div>
                    <label htmlFor="name">닉네임 </label>
                    <input
                        type='text'
                        id='name'
                        placeholder='행복한 다람쥐12'
                        value={name}
                        onChange={handleInputName}
                    />
                </div>
                <div>
                    <label htmlFor="location">주소 </label>
                    <input
                        type='text'
                        id='location'
                        placeholder='주소를 검색합니다'
                        value={location}
                        onChange={handleInputLocation}
                        readOnly // 사용자가 직접 수정할 수 없도록 읽기 전용으로 설정
                    />
                    <button onClick={handleClickButton}>주소 검색</button>

                    {/* 우편번호 검색을 띄우기 */}
                    {openPostcode &&
                        <DaumPostcode
                            style={{ width: '500px', height: '500px' }}
                            onComplete={selectAddress} // 우편번호 검색 결과 목록을 클릭했을 때 실행되는 콜백 함수
                            autoClose={false}           // 주소를 선택한 경우 사용되는 DOM을 제거하여 자동 닫힘 설정(true: 자동닫힘)
                        //defaultQuery="판교역로 235" // 기본적으로 입력되어있는 검색어
                        />}
                </div>
                <div>
                    <label htmlFor="age">나이 </label>
                    <input
                        type='text'
                        id='age'
                        placeholder='26'
                        value={age}
                        onChange={handleInputAge}
                    />
                    {/* 숫자를 입력하지 않으면 오류메세지를 띄우기 */}
                    {isNaN(age) && <p className={styles.errorMessage}>숫자만 입력할 수 있습니다</p>}
                </div>

                <button type="submit">Signup</button>

            </form >
        </div >
    )
}

export default Signup