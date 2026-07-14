import {
    CheckCircle,
    Flame,
    Droplets,
} from "lucide-react";

const activities = [
    {
        icon: CheckCircle,
        text: "Morning Workout Completed",
    },
    {
        icon: Flame,
        text: "2450 Calories Burned",
    },
    {
        icon: Droplets,
        text: "Water Goal Completed",
    },
];

const RecentActivity = () => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <h3 className="mb-5 text-lg font-semibold">

                Recent Activity

            </h3>

            <div className="space-y-4">

                {activities.map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={index}
                            className="flex items-center gap-3"
                        >

                            <div className="rounded-xl bg-emerald-500/10 p-2">

                                <Icon
                                    size={18}
                                    className="text-emerald-400"
                                />

                            </div>

                            <span className="text-zinc-300">

                                {item.text}

                            </span>

                        </div>

                    );
                })}

            </div>

        </div>
    );
};

export default RecentActivity;