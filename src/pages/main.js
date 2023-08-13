import { Link } from 'react-router-dom';
import style from './main.module.css'; // Import your CSS module

export default function MainPage() {
  return (
    <main className={style.flexContainer}>
      <Link to="/map" className={style.menuButton}>
        <span>Map</span>
      </Link>
      <Link to="/sushi-list" className={style.menuButton}>
        <span>Sushi List</span>
      </Link>
      <Link to="/enroll-restaurant" className={style.menuButton}>
        <span>Enroll Restaurant</span>
      </Link>
      <Link to="/search-restaurant" className={style.menuButton}>
        <span>Search Restaurant</span>
      </Link>
    </main>
  );
}
