import PageHeader from "../components/PageHeader";
import HistoryTimeline from "../components/HistoryTimeline";
import SponsorsSlider from '../components/SponsorsSlider'
import HistoryEvents from '../data/HistoryEvents.js'

const AboutUsPage = () => (
  <>
    <PageHeader
      title="Sobre nosotros"
      description="Nuestra historia, valores y el camino recorrido por el Club Olimpo."
    />
    <HistoryTimeline events={HistoryEvents} />
    <SponsorsSlider />
  </>
);

export default AboutUsPage;