import PageHeader from "../components/PageHeader";
import NoticiasRecientes from "../components/NoticesLatest";

const HomePage = () => {
  return (
    <>
      <PageHeader
        title="Bienvenido al Club Olimpo"
        description="Explorá nuestro sitio para conocer más sobre nosotros, nuestros equipos y las últimas noticias."
      />
      <NoticiasRecientes />
      {/* <PlantelesDestacados /> */}
      {/* <HistoriaDelClub /> */}
      {/* <ProximosPartidos /> */}
    </>
  );
};

export default HomePage;