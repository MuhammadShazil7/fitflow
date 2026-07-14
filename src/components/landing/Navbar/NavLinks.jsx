const links = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Dashboard",
    href: "#dashboard",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const NavLinks = () => {
  return (
    <ul className="hidden lg:flex items-center gap-8">

      {links.map((link) => (
        <li key={link.title}>

          <a
            href={link.href}
            className="relative text-sm font-medium text-zinc-300 transition-all duration-300 hover:text-white group"
          >
            {link.title}

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-400 transition-all duration-300 group-hover:w-full" />

          </a>

        </li>
      ))}

    </ul>
  );
};

export default NavLinks;