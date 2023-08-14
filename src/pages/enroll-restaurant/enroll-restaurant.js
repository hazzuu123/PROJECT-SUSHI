import { useEffect, useState } from "react";
import { postSushiRestaurant } from "../../apis/sushi";
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
        <div className={style.container}>
            <div className={style.titleDiamond}>
                <h1 className={style.h1}>새로운 초밥집 등록 페이지</h1>
            </div>
            <div>
                <label className={style.blueLabel}>이름</label>
                <input
                    className={style.largeInput}
                    type="text"
                    value={postData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
            </div>
            <div>
                <label className={style.blueLabel}>메뉴</label>
                {postData.menus.map((menu, index) => (
                    <div key={index}>
                        <label className={style.blueLabel}>메뉴이름</label>
                        <input
                            className={style.largeInput}
                            type="text"
                            value={menu.name}
                            onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                        />
                        <label className={style.blueLabel}>가격</label>
                        <input
                            className={style.largeInput}
                            type="text"
                            value={menu.price}
                            onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                        />
                    </div>
                ))}
                <button
                    className={style.addButton}
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
                <label className={style.blueLabel}>위치</label>
                <input
                    className={style.largeInput}
                    type="text"
                    value={postData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                />
            </div>
            <div>
                <label className={style.blueLabel}>전화번호</label>
                <input
                    className={style.largeInput}
                    type="text"
                    value={postData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                />
            </div>
            <button className={style.submitButton} onClick={() => { handlePostRequest() }}>등록</button>
        </div>
    )
}

export default EnrollRestaurantPage;