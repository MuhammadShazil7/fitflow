import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-2xl
    font-medium
    transition-all
    duration-300
    disabled:pointer-events-none
    disabled:opacity-50
    cursor-pointer
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-emerald-500
          text-white
          hover:bg-emerald-400
          hover:-translate-y-1
        `,

        secondary: `
          bg-blue-500
          text-white
          hover:bg-blue-400
          hover:-translate-y-1
        `,

        outline: `
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          hover:border-emerald-500/50
          hover:bg-white/10
        `,

        ghost: `
          hover:bg-white/5
        `,

        danger: `
          bg-red-500
          text-white
          hover:bg-red-400
        `,
      },

      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-lg",
        xl: "h-16 px-10 text-xl",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);