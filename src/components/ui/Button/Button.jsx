const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const styles = {
    primary:
      "bg-emerald-500 hover:bg-emerald-400 text-white",

    outline:
      "border border-white/20 bg-white/5 hover:bg-white/10 text-white",

    ghost:
      "bg-transparent hover:bg-white/10 text-white",
  };

  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-6
        py-3
        font-semibold
        transition-all
        duration-300
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;