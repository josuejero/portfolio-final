import Image from "next/image";
import styles from "./page.module.scss";
import type { NextPage } from "next";
import Dice from "@/components/dice"
import Sidebar from "@/components/sidebar"

const Home: NextPage = ()=>{
  return(
    <div className={styles.home}>
      <img className={styles.homeIcon} alt="" src="/"/>
    </div>
  )
}

export default Home;