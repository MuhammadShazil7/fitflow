import { ArrowRight, Play } from "lucide-react";
import { Button } from "../../ui";
import HeroStats from "./HeroStats";

const HeroContent = () => {
  return (
    <div className="max-w-xl">

      {/* Badge */}

      <div className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2">

        <span className="text-sm font-medium text-emerald-400">
          🚀 AI Powered Fitness Tracker
        </span>

      </div>

      {/* Heading */}

      <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">

        Track Your

        <span className="block bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 bg-clip-text text-transparent">

          Fitness Journey

        </span>

        Like Never Before

      </h1>

      {/* Description */}

      <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

        Build healthy habits with smart workout tracking,
        calorie monitoring, hydration reminders,
        sleep insights, and beautiful progress analytics.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">

        <Button>

          Start Free

          <ArrowRight size={18} />

        </Button>

        <Button variant="outline">

          <Play size={18} />

          Live Demo

        </Button>

      </div>

      <HeroStats />

    </div>
  );
};

export default HeroContent;