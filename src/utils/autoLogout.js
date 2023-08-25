import { changeUser } from "../store";
/** // 로그인 상태 확인 후 자동 로그아웃 처리 */
const autoLogout = ({ dispatch, navigate }) => {

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
            //EmailRef.current.focus()
        } else {
            // 중복로그인을 피하기 위해, 토큰 유효한 경우 로그인 페이지로 이동하지 않음
            navigate('/', { replace: true });
        }
    }
    else {
        // 토큰이 없다면 로그인할 준비가 되어있으므로 이메일 입력란에 자동 포커스를 준다
        //EmailRef.current.focus()
    }
}

export default autoLogout



