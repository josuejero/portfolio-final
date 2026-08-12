import BotMedicChapter from './BotMedicChapter';
import DQSentryChapter from './DQSentryChapter';
import HostDeskChapter from './HostDeskChapter';
import PortfolioHero from './PortfolioHero';

export default function Home() {
  return (
    <>
      <PortfolioHero />
      <HostDeskChapter />
      <BotMedicChapter />
      <DQSentryChapter />
    </>
  );
}
