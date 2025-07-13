import PageHeader from "../components/PageHeader";
import UpcomingMatches from "../components/UpcomingMatches";
import Sponsors from "../components/SponsorsSlider";

const MatchesPage = () => (
  <>
    <PageHeader
      title="Partidos"
      description="Consulta los próximos partidos y resultados del Club Olimpo. Mantente al día con el calendario de encuentros."
    />
    <UpcomingMatches />
    <Sponsors />
  </>
);

export default MatchesPage;