import PageHeader from "../components/PageHeader";
import SponsorsSlider from '../components/SponsorsSlider';
import NewsDetail from "../components/NewsDetail"

const NoticesPage = () => (
    <>
        <PageHeader
            title="Noticia detallada"
            description="Enterate de las últimas novedades y anuncios del Club Olimpo."
        />
        <NewsDetail />
        <SponsorsSlider />
    </>
);

export default NoticesPage;