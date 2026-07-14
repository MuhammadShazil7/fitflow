import { Card } from "../../ui";

const GoalCard = () => {
  return (
    <Card className="p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-400 text-sm">
            👋 Good Morning
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Shazil
          </h2>

        </div>

        <div className="text-right">

          <p className="text-sm text-zinc-400">
            Today's Goal
          </p>

          <h2 className="text-3xl font-black text-emerald-400">
            86%
          </h2>

        </div>

      </div>

    </Card>
  );
};

export default GoalCard;