import Glow from "./Glow";
import Grid from "./Grid";
import Particles from "./Particles";

const Background = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      <Glow />

      <Grid />

      <Particles />

    </div>
  );
};

export default Background;