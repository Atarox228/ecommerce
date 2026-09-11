import WelcomeHero from '../components/Home/WelcomeHero';
import CategoriesSection from '../components/Home/CategoriesSection';
import OffersSection from '../components/Home/OffersSection';
import CombosSection from '../components/Home/CombosSection';
import '../styles/home-page.css';

function Home() {
  return (
    <article className="home-content">
      <WelcomeHero />
      {/* <OffersSection /> */}
      <CombosSection />
    </article>
  );
}

export default Home;
