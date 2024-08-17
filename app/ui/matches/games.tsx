import clsx from "clsx";

function GameRow({ row }: { row: any }) {
  return (
    <div
      className={clsx("flex justify-between", {
        "font-bold": row.isWinningTeam,
      })}
    >
      <span>{row.team}</span>
      <span>{row.score}</span>
    </div>
  );
}
function Game({ game }: { game: any }) {
  return (
    <li className="flex flex-col bg-white rounded-xl shadow mb-4 last:mb-0 py-2 px-4">
      <GameRow
        row={{
          isWinningTeam: game.winning_team === game.team_a,
          team: game.team_a,
          score: game.status === "completed" ? game.team_a_score || "" : "TBA",
        }}
      />
      <GameRow
        row={{
          isWinningTeam: game.winning_team === game.team_b,
          team: game.team_b,
          score: game.status === "completed" ? game.team_b_score || "" : "",
        }}
      />
    </li>
  );
}
export default function Games({ games }: { games: any }) {
  if (!games || games.length === 0) {
    return "No matches here!";
  }

  return (
    <ul>
      {games.map((game: any) => (
        <Game game={game} key={game.id} />
      ))}
    </ul>
  );
}
