import { format } from "date-fns";
import { lusitana } from "@/app/ui/fonts";
// import { Match } from "@/app/lib/definitions";
import { fetchUpcomingMatches } from "@/app/lib/data";

// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function UpcomingMatches({
  seasonId,
}: {
  seasonId: string;
}) {
  const matches = await fetchUpcomingMatches(seasonId);
  if (!matches || matches.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Matches
      </h2>
      <div>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-xl mb-4 p-4">
              <div className="flex items-center font-semibold">
                <div>{match.team_a}</div>{" "}
                <div className="text-sm text-gray-800 px-2">vs.</div>
                <div> {match.team_b}</div>
              </div>
              <div className="text-gray-500 text-sm">
                {format(match.date, "MM-dd-yyyy")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
