const data = [45, 70, 60, 85, 55, 95, 80];

const ActivityChart = () => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

            <h3 className="mb-6 text-lg font-semibold">

                Weekly Activity

            </h3>

            <div className="flex h-40 items-end justify-between">

                {data.map((value, index) => (

                    <div
                        key={index}
                        className="w-8 rounded-full bg-gradient-to-t from-emerald-600 to-emerald-300 transition-all duration-300 hover:scale-105"
                        style={{
                            height: `${value}%`,
                        }}
                    />

                ))}

            </div>

        </div>
    );
};

export default ActivityChart;