import { useEffect, useRef, useState } from "react";
import style from './map.module.css'; // Import the CSS module

export default function MapPage() {
  const mapContainer = useRef(null);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  }); // 좌표 초기화(서울 시청)
  const [isTrue, setTrue] = useState(0);

  useEffect(() => {
    // 카카오맵 API 키
    const KAKAO_MAP_API_KEY = process.env.REACT_APP_API_KEY;

    // 카카오맵 API 스크립트를 동적으로 추가
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    // 스크립트 로드가 완료되면 지도를 생성
    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(
            currentPosition.latitude,
            currentPosition.longitude
          ), // 지도 중심 좌표
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
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      }
    };
    if (isTrue) {
      getCurrentLocation(); // 컴포넌트 마운트 시에 현재 위치를 업데이트하도록 호출
    }
  }, [isTrue]);

  if (currentPosition === false) {
    return <div className={style.loading}>Loading...</div>;
  }

  return (
    <div className={style.mapContainer}>
      <button
        className={style.locationButton}
        onClick={() => {
          setTrue(isTrue + 1);
        }}
      >
        현재 위치
      </button>
      <div className={style.map} ref={mapContainer} />
    </div>
  );
}
