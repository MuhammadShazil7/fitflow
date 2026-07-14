const particles = [
  {
    top: "12%",
    left: "22%",
  },
  {
    top: "35%",
    left: "82%",
  },
  {
    top: "70%",
    left: "14%",
  },
  {
    top: "60%",
    left: "74%",
  },
  {
    top: "82%",
    left: "52%",
  },
];

const Particles = () => {
  return (
    <>
      {particles.map((particle, index) => (
        <span
          key={index}
          className="
            absolute
            h-2
            w-2
            rounded-full
            bg-emerald-400/60
            animate-pulse
          "
          style={{
            top: particle.top,
            left: particle.left,
          }}
        />
      ))}
    </>
  );
};

export default Particles;