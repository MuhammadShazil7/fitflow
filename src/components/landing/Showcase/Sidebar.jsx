import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  ChartColumn,
  Settings,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Dumbbell, label: "Workout" },
  { icon: Apple, label: "Nutrition" },
  { icon: ChartColumn, label: "Progress" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 p-6">

      <h2 className="mb-10 text-2xl font-black text-emerald-400">
        FitFlow
      </h2>

      <nav className="space-y-3">

        {items.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Icon size={20} />
            {label}
          </button>
        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;