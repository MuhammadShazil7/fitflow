import {
    Flame,
    Droplets,
    Moon,
    Dumbbell,
} from "lucide-react";

const cards = [
    {
        title: "Calories",
        value: "2450",
        icon: Flame,
    },
    {
        title: "Water",
        value: "2.8L",
        icon: Droplets,
    },
    {
        title: "Sleep",
        value: "8h",
        icon: Moon,
    },
    {
        title: "Workout",
        value: "78m",
        icon: Dumbbell,
    },
];

const StatsGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-4">

            {cards.map((card) => {

                const Icon = card.icon;

                return (

                    <div
                        key={card.title}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30"
                    >

                        <div className="flex items-center justify-between">

                            <p className="text-zinc-400">
                                {card.title}
                            </p>

                            <Icon
                                size={20}
                                className="text-emerald-400"
                            />

                        </div>

                        <h3 className="mt-4 text-3xl font-bold">

                            {card.value}

                        </h3>

                    </div>

                );
            })}

        </div>
    );
};

export default StatsGrid;