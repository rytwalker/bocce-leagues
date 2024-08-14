import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
import {
  leagues,
  teams,
  seasons,
  matches,
  users,
  games,
  leagueMemberships,
  teamSeasons,
} from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
     CREATE TABLE IF NOT EXISTS users (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       role VARCHAR(50) NOT NULL CHECK (role IN ('superadmin', 'admin', 'user')),
       password_hash TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
         INSERT INTO users (id, name, email, role, password_hash)
         VALUES (${user.id}, ${user.name}, ${user.email}, ${user.role}, ${hashedPassword})
         ON CONFLICT (id) DO NOTHING;
       `;
    }),
  );

  return insertedUsers;
}

async function seedLeagues() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
     CREATE TABLE IF NOT EXISTS leagues (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       created_by UUID REFERENCES users(id) ON DELETE SET NULL,
       name TEXT NOT NULL,
       slug TEXT NOT NULL UNIQUE,
       location TEXT NOT NULL,
       city VARCHAR(255) NOT NULL,
       state VARCHAR(255) NOT NULL,
       zip VARCHAR(50) NOT NULL,
       google_place_id VARCHAR(255),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedLeagues = await Promise.all(
    leagues.map(
      (league) => client.sql`
         INSERT INTO leagues (id, created_by, name, slug, location, city, state, zip, google_place_id)
         VALUES (${league.id}, ${league.created_by}, ${league.name}, ${league.slug}, ${league.location}, ${league.city}, ${league.state}, ${league.zip}, ${league.google_place_id})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedLeagues;
}

async function seedTeams() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // await client.sql`
  //    CREATE TABLE IF NOT EXISTS teams (
  //      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //      name VARCHAR(255) NOT NULL,
  //      league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  //      image_url VARCHAR(255) NOT NULL,
  //      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  //    );
  //  `;

  const insertedTeams = await Promise.all(
    teams.map(
      (team) => client.sql`
         INSERT INTO teams (id, name, league_id, image_url)
         VALUES (${team.id}, ${team.name}, ${team.league_id}, ${team.image_url})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedTeams;
}

async function seedSeasons() {
  console.log(seasons);
  await client.sql`
     CREATE TABLE IF NOT EXISTS seasons (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       start_date DATE,
       end_date DATE,
       league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
       status VARCHAR(255) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedSeasons = await Promise.all(
    seasons.map(
      (season) => client.sql`
         INSERT INTO seasons (id, name, start_date, end_date, league_id, status)
         VALUES (${season.id}, ${season.name}, ${season.start_date}, ${season.end_date}, ${season.league_id}, ${season.status})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedSeasons;
}

async function seedMatches() {
  // await client.sql`
  //    CREATE TABLE IF NOT EXISTS matches (
  //      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //      season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
  //      team_a_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  //      team_b_id UUID REFERENCES teams(id) ON DELETE SET NULL,
  //      date DATE,
  //      status VARCHAR(255) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
  //      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  //    );
  //  `;

  const insertedMatches = await Promise.all(
    matches.map(
      (match) => client.sql`
         INSERT INTO matches (id, season_id, team_a_id, team_b_id, date, status)
         VALUES (${match.id}, ${match.season_id}, ${match.team_a_id}, ${match.team_b_id}, ${match.date}, ${match.status} )
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedMatches;
}

async function seedGames() {
  await client.sql`
     CREATE TABLE IF NOT EXISTS games (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
       team_a_score INT,
       team_b_score INT,
       winning_team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
       status VARCHAR(255) NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedGames = await Promise.all(
    games.map(
      (game) => client.sql`
         INSERT INTO games (match_id, team_a_score, team_b_score, winning_team_id, status)
         VALUES (${game.match_id}, ${game.team_a_score}, ${game.team_b_score}, ${game.winning_team_id}, ${game.status})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedGames;
}

async function seedLeagueMemberships() {
  await client.sql`
     CREATE TABLE IF NOT EXISTS league_memberships (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       user_id UUID REFERENCES users(id) ON DELETE CASCADE,
       league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
       role VARCHAR(255) NOT NULL CHECK (role IN ('league_admin', 'team_captain', 'player')),
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedLeagueMemberships = await Promise.all(
    leagueMemberships.map(
      (membership) => client.sql`
         INSERT INTO league_memberships (user_id, league_id, role)
         VALUES (${membership.user_id}, ${membership.league_id}, ${membership.role})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedLeagueMemberships;
}

async function seedTeamSeasons() {
  await client.sql`
     CREATE TABLE IF NOT EXISTS team_seasons (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       season_id UUID REFERENCES seasons(id) ON DELETE CASCADE,
       team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );
   `;

  const insertedTeamSeasons = await Promise.all(
    teamSeasons.map(
      (season) => client.sql`
         INSERT INTO team_seasons (season_id, team_id)
         VALUES (${season.season_id}, ${season.team_id})
         ON CONFLICT (id) DO NOTHING;
       `,
    ),
  );

  return insertedTeamSeasons;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedLeagues();
    // await seedTeams();
    // await seedSeasons();
    // await seedMatches();
    // await seedGames();
    // await seedLeagueMemberships();
    await seedTeamSeasons();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
  // return Response.json({ message: "nothing to see here" });
}
