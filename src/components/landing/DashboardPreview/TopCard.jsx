import { Bell } from "lucide-react";

const TopCard = () => {
  return (
    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm text-zinc-400">
          Welcome Back 👋
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Shazil
        </h2>

      </div>

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500">

        <Bell size={20} />

      </div>

    </div>
  );
};

export default TopCard;