import PageHeader from "../components/PageHeader";
import Notices from "../components/Notices";
import SponsorsSlider from '../components/SponsorsSlider';
import newsData from "../data/newsData"; // ← Importás los datos aquí

const NoticesPage = () => (
  <>
    <PageHeader
      title="Noticias"
      description="Enterate de las últimas novedades y anuncios del Club Olimpo."
    />
    <Notices newsData={newsData} /> {/* ← Se los pasás como prop */}
    <SponsorsSlider />
  </>
);

export default NoticesPage;