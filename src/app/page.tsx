import "../styles/_main.scss"
import HomeSection from '@/components/HomeSection'
import About from '@/components/About'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'
import Dice from '@/components/Dice'
import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <main>
      <div className="fixed-child">
        <button className="toggle-button">Toggle Sidebar</button>
        <Sidebar/>
      </div>
      <div className="scrollable-child">
        <button className="toggle-button">Toggle Sidebar</button>
        <HomeSection/>
        <About/>
        <Dice/>
        <Blog/>
        <Contact/>
      </div>
    </main>
  )
}
