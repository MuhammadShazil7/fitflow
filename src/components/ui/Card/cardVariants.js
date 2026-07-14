import { cva } from "class-variance-authority";

export const cardVariants = cva(
  `
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
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },

      hover: {
        true: `
          hover:-translate-y-1
          hover:border-emerald-500/30
          hover:shadow-[0_0_35px_rgba(34,197,94,.15)]
        `,
        false: "",
      },
    },

    defaultVariants: {
      padding: "md",
      hover: true,
    },
  }
);