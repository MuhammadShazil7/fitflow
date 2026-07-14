const cards = [
  {
    title: "Calories",
    value: "2450",
  },
  {
    title: "Water",
    value: "2.8L",
  },
  {
    title: "Workout",
    value: "78 min",
  },
  {
    title: "Sleep",
    value: "8h 15m",
  },
];

const MainDashboard = () => {
  return (
    <div className="flex-1 p-8">

      <h2 className="text-3xl font-black">

        Dashboard

      </h2>

      <p className="mt-2 text-zinc-400">

        Welcome back, Shazil 👋

      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >

            <p className="text-zinc-400">

              {card.title}

            </p>

            <h3 className="mt-3 text-4xl font-black">

              {card.value}

            </h3>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">

        <h3 className="mb-6 text-xl font-bold">

          Weekly Progress

        </h3>

        <div className="flex h-60 items-end justify-between">

          {[35,55,45,75,95,70,80].map((height,index)=>(
            <div
              key={index}
              className="w-10 rounded-full bg-gradient-to-t from-emerald-600 to-emerald-300"
              style={{height:`${height}%`}}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default MainDashboard;