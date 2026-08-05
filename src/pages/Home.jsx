import WelcomeHero from '../components/Home/WelcomeHero';
import CategoriesSection from '../components/Home/CategoriesSection';
import OffersSection from '../components/Home/OffersSection';
import CombosSection from '../components/Home/CombosSection';
import '../styles/home-page.css';

function Home() {
  return (
    <div className="home">
      <main className="home-content">
        <WelcomeHero />
        {/* <OffersSection /> */}
        <CombosSection />
      </main>
    </div>
  );
}

export default Home;
