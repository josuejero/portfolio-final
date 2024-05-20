import type { NextPage } from "next";
import Image from "next/image";
import styles from "@/app/styles/DiceSection.module.scss";

const DiceSection: NextPage = () => {
  return (
    <div className={styles.diceSection}>
      <h2 className={styles.discoverMyProjects}>
        Discover My Projects By Skill!
      </h2>
      <div className={styles.diceWrapper}>
        <Image
          className={styles.pythonLogoIcon}
          src="/pythonlogoonly-1@2x.png"
          alt="Python Logo"
          width={100} // Adjust width as needed
          height={100} // Adjust height as needed
        />
        <button className={styles.rollDiceButton}>
          ROLL THE DIE!
        </button>
      </div>
    </div>
  );
};

export default DiceSection;
