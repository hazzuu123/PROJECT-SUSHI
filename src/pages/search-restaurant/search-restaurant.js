import React, { useState, useRef, useEffect } from 'react';
import style from './search-restaurant.module.css'; // Import the CSS module

const SearchRestaurantPage = () => {
    const mapContainer = useRef(null);
    const [location, setLocation] = useState('');

    const handleInputChange = (value) => setLocation(value);

    /** 주소로 장소 표시하기(지도)*/
    const handleSearchRestaurant = () => {
        // 스크립트 로드가 완료되면 입력한 주소를 지도에 표시하기
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
            const container = mapContainer.current;

            const options = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 5,
            };

            // 지도 생성
            const map = new window.kakao.maps.Map(container, options);

            // 주소-좌표 변환 객체를 생성
            const geocoder = new window.kakao.maps.services.Geocoder();

            //주소로 좌표를 검색

            geocoder.addressSearch(location, (result, status) => {
                //정상적으로 검색이 완료됐으면
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);


                    // 검색된 좌표로 지도 이동
                    map.setCenter(coords);

                    // 기존 마커 제거
                    // if (marker) marker.setMap(null);

                    // 검색된 좌표에 마커 생성
                    let marker = new window.kakao.maps.Marker({
                        position: coords,
                    });
                    marker.setMap(map);

                } else {
                    console.log('주소 검색 실패');
                }
            });

        } else {
            console.log('카카오맵 API 로드 실패');
        }

    }

    /** 카카오맵 스크립트 로드 */
    useEffect(() => {
        // 카카오맵 API 키
        const KAKAO_MAP_API_KEY = process.env.REACT_APP_API_KEY;

        // 카카오맵 API 스크립트를 동적으로 추가
        // 카카오맵 지도 라이브러리중 services 라이브러리 파라미터 추가
        const script = document.createElement("script");
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;


        script.onload = () => {
            window.kakao.maps.load(() => {
                console.log('카카오맵 API 로드 완료');
            });
        };

        document.head.appendChild(script);
        return () => {
            // 컴포넌트가 언마운트되면 스크립트 제거
            document.head.removeChild(script);
        };
    }, [])

    return (
        <div className={style.searchContainer}>
            <div className={style.inputContainer}>
                <input
                    className={style.input}
                    type='text'
                    value={location}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <button className={style.searchButton} onClick={handleSearchRestaurant}>
                    입력
                </button>
            </div>
            <div className={style.mapContainer} ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
        </div>
    );
};

export default SearchRestaurantPage;
