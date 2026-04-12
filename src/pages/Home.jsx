import Header from '../components/Header';
import Footer from '../components/Footer';
import WelcomeHero from '../components/Home/WelcomeHero';
import CategoriesSection from '../components/Home/CategoriesSection';
import OffersSection from '../components/Home/OffersSection';
import CombosSection from '../components/Home/CombosSection';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <Header />
      <main className="home-content">
        <WelcomeHero />
        <CategoriesSection />
        <OffersSection />
        <CombosSection />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
