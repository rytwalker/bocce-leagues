import { format } from "date-fns";
import { lusitana } from "@/app/ui/fonts";
import { Match } from "@/app/lib/definitions";

// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({ matches }: { matches: Match[] }) {
  if (!matches || matches.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Matches
      </h2>
      <div>
        {matches.map((match) => (
          <div key={match.id}>
            {match.team_a} vs. {match.team_b}
            <div>{format(match.date, "MM-dd-yyyy")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
