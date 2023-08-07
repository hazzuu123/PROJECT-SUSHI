import { useEffect, useState } from "react";
import { postSushiRestaurant } from "../apis/sushi";
import style from './enroll-restaurant.module.css';
/** 새로운 초밥집 등록 페이지*/
const EnrollRestaurantPage = () => {
    const [postData, setPostData] = useState({
        name: '',
        menus: [{
            name: '',
            price: ''
        }],
        location: '',
        phone: ''
    });

    /** 새로운 초밥집 등록을 요청하는 api 호출 */
    const handlePostRequest = () => {
        postSushiRestaurant([{ ...postData }])
            .then((response) => console.log(response))
            .catch((error) => console.log('Error: ', error));
    }

    /** 초밥집 정보를 설정*/
    const handleInputChange = (field, value) => {
        setPostData({
            ...postData,
            [field]: value,
        });
    }

    /** 2개이상의 menu를 가질 수 있도록, 초밥집 정보중 Menu 따로 설정 */
    const handleMenuChange = (index, field, value) => {
        const updatedMenus = [...postData.menus];
        updatedMenus[index][field] = value;
        setPostData({
            ...postData,
            menus: updatedMenus,
        });
    };

    return (
        <div>
            <h3 className={style.h3}>새로운 초밥집 등록 페이지</h3>
            <div>
                <label>이름:</label>
                <input
                    type="text"
                    value={postData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>
            <div>
                <label>메뉴</label>
                {postData.menus.map((menu, index) => (
                    <div key={index}>
                        <label>메뉴이름:</label>
                        <input
                            type="text"
                            value={menu.name}
                            onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                        />
                        <label>가격:</label>
                        <input
                            type="text"
                            value={menu.price}
                            onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                        />
                    </div>
                ))}
                <button
                    onClick={() => {
                        setPostData({
                            ...postData,
                            menus: [...postData.menus, { name: '', price: '' }],
                        });
                    }}
                >
                    메뉴 추가
                </button>
            </div>
            <div>
                <label>위치:</label>
                <input
                    type="text"
                    value={postData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                />
            </div>
            <div>
                <label>전화번호:</label>
                <input
                    type="text"
                    value={postData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                />
            </div>
            <button onClick={() => { handlePostRequest() }}>등록</button>
        </div>



    )

}

export default EnrollRestaurantPage;