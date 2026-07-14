import { Activity, Apple, ChartColumn } from "lucide-react";
import { Container, Section } from "../../ui";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Activity,
    title: "Workout Tracking",
    description:
      "Track every workout, monitor progress, and stay consistent with personalized routines.",
  },
  {
    icon: Apple,
    title: "Nutrition",
    description:
      "Count calories, monitor macros, and build healthy eating habits effortlessly.",
  },
  {
    icon: ChartColumn,
    title: "Smart Analytics",
    description:
      "Visualize your fitness journey with premium charts and real-time insights.",
  },
];

const Features = () => {
  return (
    <Section id="features">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">

            FEATURES

          </span>

          <h2 className="mt-6 text-5xl font-black">

            Everything You Need

            <span className="block text-emerald-400">

              In One Platform

            </span>

          </h2>

          <p className="mt-6 text-lg text-zinc-400">

            Powerful tools designed to help you stay motivated,
            track progress, and achieve your fitness goals.

          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
};

export default Features;