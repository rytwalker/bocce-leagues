import { Card } from "@/app/ui/dashboard/cards";
import UpcomingMatches from "@/app/ui/dashboard/upcoming-matches";
import TeamStandings from "@/app/ui/dashboard/team-standings";
import { lusitana } from "@/app/ui/fonts";
import {
  fetchTeams,
  fetchUpcomingMatches,
  fetchCardData,
} from "@/app/lib/data";

export default async function Page() {
  const upcomingMatches = await fetchUpcomingMatches();
  const teams = await fetchTeams();
  const { numberOfTeams, matchesCompletePercentage, numberOfGames } =
    await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Completed Matches"
          value={matchesCompletePercentage}
          type="collected"
        />
        <Card title="Games Played" value={numberOfGames} type="pending" />
        <Card title="Total Teams" value={numberOfTeams} type="teams" />
        <Card title="Total Teams" value={numberOfTeams} type="teams" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <UpcomingMatches matches={upcomingMatches} />
        <TeamStandings teams={teams} />
      </div>
    </main>
  );
}
