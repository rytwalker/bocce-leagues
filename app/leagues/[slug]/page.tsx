import { fetchLeague, fetchSeason, fetchSeasonById } from "@/app/lib/data";
import { koulen } from "@/app/ui/fonts";
import { format } from "date-fns";
import Matches from "@/app/ui/matches";

export default async function League(props: any) {
  const league = await fetchLeague(props.params.slug);
  const season = await fetchSeason();
  const matches = await fetchSeasonById(season.id);

  if (!league) {
    return <div>Not found</div>;
  }

  return (
    <main>
      <div>
        {league.name} @{league.location}
      </div>
      <div>
        {league.city}, {league.state} {league.zip}
      </div>
      <div className="p-2">
        <h2 className="text-xl mb-4">Current Season: {season.name}</h2>
        {Object.keys(matches).map((date) => (
          <>
            <h3 className={`${koulen.className} text-lg`}>
              {format(new Date(date), "MM-dd-yyyy")}
            </h3>
            <Matches matches={matches[date]} />
          </>
        ))}
      </div>
    </main>
  );
}
