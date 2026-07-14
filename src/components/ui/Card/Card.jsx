const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,.35)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;