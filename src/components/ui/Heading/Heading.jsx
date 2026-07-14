const Heading = ({
  badge,
  title,
  subtitle,
  align = "left",
}) => {
  return (
    <div
      className={`${
        align === "center"
          ? "text-center"
          : "text-left"
      }`}
    >
      {badge && (
        <span className="mb-4 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
          {badge}
        </span>
      )}

      <h2 className="text-5xl font-black tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;