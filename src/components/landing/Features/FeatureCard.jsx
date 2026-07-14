import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
    >
      {/* Glow */}

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all duration-500 group-hover:bg-emerald-500/20" />

      <div className="relative">

        <div className="mb-6 inline-flex rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">

          <Icon size={30} />

        </div>

        <h3 className="text-2xl font-bold">

          {title}

        </h3>

        <p className="mt-4 leading-7 text-zinc-400">

          {description}

        </p>

      </div>

    </motion.div>
  );
};

export default FeatureCard;