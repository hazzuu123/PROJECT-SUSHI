import { useState, useRef } from 'react';
import styles from './delete-account.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeUser } from '../../store';
import { deleteAccountRequest } from '../../apis/sushi';

/** 계정탈퇴 페이지 */
const DeleteAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const passwordRef = useRef(null)
    const [inputPassword, setInputPassword] = useState('') // 탈퇴하기 전 마지막으로 비밀번호 입력
    const [passwordCorrect, setPasswordCorrect] = useState(true) // 비밀번호 일치여부

    const handleInputPassword = (event) => setInputPassword(event.target.value)
    const handleDeleteAccount = async (event) => {
        event.preventDefault()
        // // 비밀번호를 틀리면 비밀번호를 다시 입력
        // setPasswordCorrect(false)
        // setInputPassword('')
        // passwordRef.current.focus()
        // return

        // // 실제 회원 탈퇴 API 호출 등의 작업을 수행한다.
        // setPasswordCorrect(true)
        try {
            const response = await deleteAccountRequest({
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                },
            })
            // store.js 의 계정 데이터를 ''으로 초기화
            dispatch(changeUser({ email: '', name: '', location: '', age: '' }))

            // localStorage 삭제
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')

            // 임의로 탈퇴 완료 페이지로 이동
            navigate('/delete-success', { replace: true })
            console.log('회원탈퇴 성공')
        } catch (error) {
            console.log('회원탈퇴 실패:', error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            passwordRef.current.focus() // 비밀번호 입력란에 포커스를 줌
        } else {
            navigate('/login', { replace: true })
        }
    }, [])
    return (
        <div>
            <h2>회원 탈퇴</h2>
            <p>계정을 영구적으로 삭제하려면 비밀번호를 입력하세요.</p>
            <form>
                <label htmlFor='inputPassword'></label>
                <input
                    type='password'
                    value={inputPassword}
                    id='inputPassword'
                    ref={passwordRef}
                    onChange={handleInputPassword}
                />
                {!passwordCorrect && (
                    <p style={{ color: 'red' }} className={styles.errorText}>비밀번호가 일치하지 않습니다.</p>
                )}
                <button onClick={handleDeleteAccount}>회원 탈퇴</button>
            </form>
        </div>

    )
}

export default DeleteAccount;