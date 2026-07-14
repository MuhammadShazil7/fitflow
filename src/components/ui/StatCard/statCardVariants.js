import { cva } from "class-variance-authority";

export const statCardVariants = cva(
  `
  relative
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-white/5
  backdrop-blur-xl
  transition-all
  duration-300
  `,
  {
    variants: {
      hover: {
        true: `
          hover:-translate-y-2
          hover:border-emerald-500/40
          hover:shadow-[0_20px_60px_rgba(34,197,94,.18)]
        `,
        false: "",
      },
    },

    defaultVariants: {
      hover: true,
    },
  }
);