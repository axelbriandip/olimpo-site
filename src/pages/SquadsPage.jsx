import PageHeader from "../components/PageHeader";
import Squads from "../components/Squads";
import SponsorsSlider from "../components/SponsorsSlider";

const SquadsPage = () => (
  <>
    <PageHeader
      title="Equipos"
      description="Conocé a los planteles y jugadores que representan al club."
    />
    <Squads />
    <SponsorsSlider />
  </>
);

export default SquadsPage;