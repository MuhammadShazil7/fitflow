import { Container, Section } from "../../ui";
import Sidebar from "./Sidebar";
import MainDashboard from "./MainDashboard";

const Showcase = () => {
  return (
    <Section>

      <Container>

        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_40px_120px_rgba(0,0,0,.45)]">

          <div className="flex min-h-[700px]">

            <Sidebar />

            <MainDashboard />

          </div>

        </div>

      </Container>

    </Section>
  );
};

export default Showcase;