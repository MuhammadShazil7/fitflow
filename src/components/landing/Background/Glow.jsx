const Glow = () => {
  return (
    <>
      {/* Emerald */}

      <div
        className="
        absolute
        left-[-200px]
        top-[-150px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-emerald-500/20
        blur-[140px]
      "
      />

      {/* Blue */}

      <div
        className="
        absolute
        right-[-200px]
        top-[250px]
        h-[450px]
        w-[450px]
        rounded-full
        bg-blue-500/15
        blur-[150px]
      "
      />

      {/* Bottom */}

      <div
        className="
        absolute
        bottom-[-200px]
        left-1/2
        h-[600px]
        w-[600px]
        -translate-x-1/2
        rounded-full
        bg-emerald-400/10
        blur-[180px]
      "
      />
    </>
  );
};

export default Glow;