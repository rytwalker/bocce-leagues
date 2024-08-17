import { fetchSeason, fetchSeasonById } from "@/app/lib/data";
import { koulen } from "@/app/ui/fonts";
import { format } from "date-fns";
import Matches from "@/app/ui/matches";

export default async function Page() {
  const season = await fetchSeason();
  const matches = await fetchSeasonById(season.id);
  return (
    <main>
      {Object.keys(matches).map((date) => (
        <>
          <h3 className={`${koulen.className} text-lg`}>
            {format(new Date(date), "MM-dd-yyyy")}
          </h3>
          <Matches matches={matches[date]} isEditable />
        </>
      ))}
    </main>
  );
}
