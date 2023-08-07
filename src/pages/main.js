import { Link } from 'react-router-dom'

export default function MainPage() {
  return (
    <main className='flex gap-3'>
      <Link to="/map">Map</Link>
      <Link to="/sushi-list">Sushi List</Link>
      <Link to="/enroll-restaurant">Enroll restaurant</Link>
    </main>
  )
}