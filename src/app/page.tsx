import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <div className="fixed-child">
        <button className="toggle-button">Toggle Sidebar</button>
      </div>
      <div className="scrollable-child">
        <button className="toggle-button">Toggle Sidebar</button>
      </div>
    </main>
  )
}
