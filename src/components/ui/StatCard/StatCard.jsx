import Card from "../Card/Card";

const StatCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
}) => {
  return (
    <Card>

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>

          <p className="mt-1 text-sm text-emerald-400">
            {subtitle}
          </p>

        </div>

        <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400">

          <Icon size={24} />

        </div>

      </div>

    </Card>
  );
};

export default StatCard;