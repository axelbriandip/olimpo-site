import PageHeader from "../components/PageHeader";
import NoticiasRecientes from "../components/NoticesLatest";
import WelcomeCarousel from "../components/WelcomeCarousel";
import SponsorsSlider from "../components/SponsorsSlider";
import BestPlayers from "../components/BestPlayers";
import Testimonials from "../components/Testimonials";
import VisionMissionValues from "../components/VisionMissionValues";

const HomePage = () => {
  return (
    <>
      <PageHeader
        title="Bienvenido al Club Olimpo"
        description="Explorá nuestro sitio para conocer más sobre nosotros, nuestros equipos y las últimas noticias."
      />
      <WelcomeCarousel />
      <SponsorsSlider />
      <VisionMissionValues />
      <NoticiasRecientes />
      <BestPlayers />
      <SponsorsSlider />
      <Testimonials />
      {/* <CardPlayerOfMonth /> */}
      {/* <PlantelesDestacados /> */}
      {/* <HistoriaDelClub /> */}
      {/* <ProximosPartidos /> */}
    </>
  );
};

export default HomePage;