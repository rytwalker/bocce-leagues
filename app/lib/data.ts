import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchUpcomingMatches(seasonId: string) {
  try {
    const data = await sql`
      SELECT matches.id as match_id, matches.date as date, t1.name AS team_a, t2.name AS team_b  FROM matches
      JOIN teams t1 ON matches.team_a_id = t1.id
      JOIN teams t2 ON matches.team_b_id = t2.id
      WHERE matches.status = 'not_started'
      AND matches.season_id = ${seasonId}
      AND matches.date >= CURRENT_DATE
      ORDER BY matches.date ASC
      LIMIT 3`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLeagues() {
  try {
    const data = await sql`
      SELECT * FROM leagues;
    `;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the teams.");
  }
}

export async function fetchLeague(slug: string) {
  try {
    const data = await sql`
    SELECT * FROM leagues WHERE slug = ${slug};
    `;
    console.log(data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the teams.");
  }
}

export async function fetchTeams(seasonId: string) {
  try {
    const data = await sql`
      SELECT 
        teams.id, teams.name, teams.image_url, 
        COUNT(games.id) AS total_games_played,
        COUNT(CASE WHEN games.winning_team_id = teams.id THEN 1 END) AS total_games_won,
        COUNT(games.id) - COUNT(CASE WHEN games.winning_team_id = teams.id THEN 1 END) AS total_games_lost
      FROM teams
      JOIN team_seasons ON teams.id = team_seasons.team_id
      JOIN matches ON matches.season_id = team_seasons.season_id
      LEFT JOIN games ON games.match_id = matches.id AND (matches.team_a_id = teams.id OR matches.team_b_id = teams.id) 
      WHERE team_seasons.season_id = ${seasonId}
      AND games.status = 'completed'
      GROUP BY teams.id, teams.name
      ORDER BY total_games_won DESC;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the teams.");
  }
}

export async function fetchCardData(seasonId: string) {
  try {
    const matchesCompletePromise = sql`SELECT (COUNT(CASE WHEN matches.status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) AS completed_percentage FROM matches WHERE matches.season_id = ${seasonId}`;
    const teamCountPromise = sql`SELECT COUNT(*) FROM teams JOIN team_seasons ON teams.id = team_seasons.team_id WHERE team_seasons.season_id = ${seasonId}`;
    const gamesCountPromise = sql`SELECT COUNT(*) FROM games 
      JOIN matches ON games.match_id = matches.id
      WHERE games.status = 'completed'
      AND matches.season_id = ${seasonId}`;

    const data = await Promise.all([
      matchesCompletePromise,
      teamCountPromise,
      gamesCountPromise,
    ]);

    const matchesCompletePercentage = data[0].rows[0].completed_percentage
      ? `${Number(data[0].rows[0].completed_percentage).toFixed(0)}%`
      : "0%";
    const numberOfTeams = Number(data[1].rows[0].count ?? "0");
    const numberOfGames = Number(data[2].rows[0].count ?? "0");

    return {
      numberOfTeams,
      matchesCompletePercentage,
      numberOfGames,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchSeason() {
  try {
    const data = await sql`
    SELECT * FROM seasons WHERE status = 'in_progress';`;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export async function fetchSeasonById(id: string) {
  try {
    const data = await sql`
      SELECT 
        m.id AS match_id,
        m.date,
        t1.name AS team_a,
        t2.name AS team_b,
        m.status,
        g.id AS game_id,
        g.team_a_score,
        g.team_b_score,
        t3.name AS winning_team
      FROM 
        matches m
      JOIN 
        teams t1 ON m.team_a_id = t1.id
      JOIN 
        teams t2 ON m.team_b_id = t2.id
      LEFT JOIN 
        games g ON g.match_id = m.id
      LEFT JOIN 
        teams t3 ON g.winning_team_id = t3.id
      WHERE 
        m.season_id = ${id}
      ORDER BY 
        m.date ASC, g.id ASC;`;

    const schedule = data.rows.reduce((acc, cur) => {
      if (!acc[cur.date]) {
        acc[cur.date] = {};
      }

      if (!acc[cur.date][cur.match_id]) {
        acc[cur.date][cur.match_id] = [];
      }

      acc[cur.date][cur.match_id].push(cur);

      return acc;
    }, {});

    console.log("schedule: ", schedule);
    return schedule;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
