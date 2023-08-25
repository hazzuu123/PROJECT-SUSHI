/** 서버로부터 데이터를 가져오는 기능 */
import { changeUser } from "../store"
import axios from "axios"
const getInitialData = async (dispatch) => {
    // 로그인 되어있다면 토큰을 보내 유저정보(이메일, 이름, 주소...) 가져옴
    try {
        const response = await axios.get('http://146.56.180.210:3200/auth/user-data', {
            headers: {
                Authorization: `${localStorage.getItem('token')}`
            },
        })

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
        console.log('초기데이터 불러오기 실패: ', error)
    }
}

export default getInitialData