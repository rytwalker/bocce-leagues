import { fetchLeague } from "@/app/lib/data";

export default async function League(props: any) {
  const league = await fetchLeague(props.params.slug);

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
    </main>
  );
}
