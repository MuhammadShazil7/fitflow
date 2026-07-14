const stats = [
  {
    number: "25K+",
    label: "Active Users",
  },
  {
    number: "1M+",
    label: "Calories Tracked",
  },
  {
    number: "120K+",
    label: "Workouts",
  },
];

const HeroStats = () => {
  return (
    <div className="mt-14 flex flex-wrap gap-10">

      {stats.map((item) => (
        <div key={item.label}>

          <h3 className="text-3xl font-black">
            {item.number}
          </h3>

          <p className="mt-1 text-zinc-400">
            {item.label}
          </p>

        </div>
      ))}

    </div>
  );
};

export default HeroStats;