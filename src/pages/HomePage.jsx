import PageHeader from "../components/PageHeader";
import NoticiasRecientes from "../components/NoticesLatest";
import WelcomeCarousel from "../components/WelcomeCarousel";
import CardPlayerOfMonth from "../components/CardPlayerOfMonth";


const HomePage = () => {
  return (
    <>
      <PageHeader
        title="Bienvenido al Club Olimpo"
        description="Explorá nuestro sitio para conocer más sobre nosotros, nuestros equipos y las últimas noticias."
      />
      <WelcomeCarousel />
      <NoticiasRecientes />
      <CardPlayerOfMonth />
      {/* <PlantelesDestacados /> */}
      {/* <HistoriaDelClub /> */}
      {/* <ProximosPartidos /> */}
    </>
  );
};

export default HomePage;