import { fetchLeagues } from "@/app/lib/data";
import { Link } from "../ui/core/link";

export default async function Leagues() {
  const leagues = await fetchLeagues();
  if (!leagues || leagues.length === 0) {
    return <div>No leagues found</div>;
  }
  return (
    <ul className="p-6">
      {leagues.map((league) => (
        <li>
          <Link href={`/leagues/${league.slug}`}>{league.name}</Link>
        </li>
      ))}
    </ul>
  );
}
