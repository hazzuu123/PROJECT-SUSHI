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
    // ... (이전 코드와 동일)
  }, [currentPosition]);

  useEffect(() => {
    // ... (이전 코드와 동일)
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
