import CardWrapper, { Card } from "@/app/ui/dashboard/cards";
import UpcomingMatches from "@/app/ui/dashboard/upcoming-matches";
import TeamStandings from "@/app/ui/dashboard/team-standings";
import { lusitana } from "@/app/ui/fonts";
import { fetchSeason } from "@/app/lib/data";
import { Suspense } from "react";
import {
  CardsSkeleton,
  TeamsSkeleton,
  UpcomingMatchesSkeleton,
} from "@/app/ui/skeletons";

export default async function Page() {
  const season = await fetchSeason();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2>{season.name}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper seasonId={season.id} />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<UpcomingMatchesSkeleton />}>
          <UpcomingMatches seasonId={season.id} />
        </Suspense>
        <Suspense fallback={<TeamsSkeleton />}>
          <TeamStandings seasonId={season.id} />
        </Suspense>
      </div>
    </main>
  );
}
