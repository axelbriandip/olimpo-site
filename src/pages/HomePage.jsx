import PageHeader from "../components/PageHeader";
import NoticiasRecientes from "../components/NoticesLatest";
import SponsorsSlider from "../components/SponsorsSlider";
import BestPlayers from "../components/BestPlayers";
import Testimonials from "../components/Testimonials";
import VisionMissionValues from "../components/VisionMissionValues";
import Hero from "../components/HeroSlider.";


const HomePage = () => {
  return (
    <>
      <PageHeader
        title="Bienvenido al Club Olimpo"
        description="Explorá nuestro sitio para conocer más sobre nosotros, nuestros equipos y las últimas noticias."
      />
      {/* <WelcomeCarousel /> */}
      <Hero />
      <VisionMissionValues />
      <SponsorsSlider />
      <NoticiasRecientes />
      <BestPlayers />
      <Testimonials />
      <SponsorsSlider />
    </>
  );
};

export default HomePage;