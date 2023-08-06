import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'


function App() {

  /** 초밥집 등록 */
  useEffect(() => {
    fetch("http://146.56.180.210:3200/sushi", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "초밥",
        menus: [{
          name: "연어초밥",
          price: "20000원"
        }],
        location: '테헤란로 52',
        phone: '010 - 1234 - 1234'
      })
    })
      .then((response) => response.json())
      .then((result) => console.log(result));

  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Map></Map>}></Route>
      </Routes>

    </div>
  )
}
const Map = () => {
  const mapContainer = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({ latitude: 37.5665, longitude: 126.9780 }); // 좌표 초기화(서울 시청)
  const [isTrue, setTrue] = useState(0);



  useEffect(() => {

    // 카카오맵 API 키
    const KAKAO_MAP_API_KEY = process.env.REACT_APP_API_KEY;


    // 카카오맵 API 스크립트를 동적으로 추가
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    // 스크립트 로드가 완료되면 지도를 생성
    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(currentPosition.latitude, currentPosition.longitude), // 지도 중심 좌표 
          level: 5, // 확대 레벨
        };
        const map = new window.kakao.maps.Map(mapContainer.current, options);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: options.center,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, [currentPosition]);


  useEffect(() => {
    // 현재 위치를 불러와서 currentPosition 상태 업데이트
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
            console.log(latitude, longitude);
          },
          (error) => {
            console.error('Error getting current position:', error);
          }
        );
      }
    };
    if (isTrue) {
      getCurrentLocation(); // 컴포넌트 마운트 시에 현재 위치를 업데이트하도록 호출
    }
  }, [isTrue]);

  if (currentPosition === false) {
    return <div>Loading...</div>; // 현재 위치 정보가 없을 때 "Loading..."을 표시
  }




  return (
    <>
      <button onClick={() => { setTrue(isTrue + 1); }}>현재위치</button>
      <div style={{ width: '100%', height: '100vh' }} ref={mapContainer} />
    </>
  )
};

export default App;
