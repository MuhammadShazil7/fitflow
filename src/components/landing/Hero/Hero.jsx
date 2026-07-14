import { Container, Section } from "../../ui";
import HeroContent from "./HeroContent";
import DashboardPreview from "../DashboardPreview/DashboardPreview";

const Hero = () => {
  return (
    <Section className="min-h-screen flex items-center pt-32">

      <Container>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Side */}
          <div className="flex justify-center lg:justify-start">
            <HeroContent />
          </div>

          {/* Right Side */}
          <div className="flex justify-center lg:justify-end">
            <DashboardPreview />
          </div>

        </div>

      </Container>

    </Section>
  );
};

export default Hero;