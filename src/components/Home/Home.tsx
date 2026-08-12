import BotMedicChapter from './BotMedicChapter';
import CycleReadyChapter from './CycleReadyChapter';
import DQSentryChapter from './DQSentryChapter';
import HomeClosing from './HomeClosing';
import HostDeskChapter from './HostDeskChapter';
import PortfolioHero from './PortfolioHero';

export default function Home() {
  return (
    <>
      <PortfolioHero />
      <HostDeskChapter />
      <BotMedicChapter />
      <DQSentryChapter />
      <CycleReadyChapter />
      <HomeClosing />
    </>
  );
}
