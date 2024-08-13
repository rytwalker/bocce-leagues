import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
} from "./definitions";
import { formatCurrency } from "./utils";

export async function fetchUpcomingMatches() {
  try {
    const data = await sql`
      SELECT matches.id as match_id, matches.date as date, t1.name AS team_a, t2.name AS team_b  FROM matches
      JOIN teams t1 ON matches.team_a_id = t1.id
      JOIN teams t2 ON matches.team_b_id = t2.id
      WHERE matches.status = 'not_started'
      AND matches.date >= CURRENT_DATE
      ORDER BY matches.date ASC
      LIMIT 3`;
    console.log(data.rows);

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchTeams() {
  try {
    const data = await sql`
      SELECT teams.id, teams.name, teams.image_url, COUNT(games.id) AS total_games_played,
      COUNT(CASE WHEN games.winning_team_id = teams.id THEN 1 END) AS total_games_won,
      COUNT(games.id) - COUNT(CASE WHEN games.winning_team_id = teams.id THEN 1 END) AS total_games_lost
      FROM teams
      JOIN team_seasons ON teams.id = team_seasons.team_id
      JOIN seasons ON team_seasons.season_id = seasons.id
      JOIN leagues ON seasons.league_id = leagues.id
      JOIN matches ON matches.season_id = seasons.id
      LEFT JOIN games ON games.match_id = matches.id AND (matches.team_a_id = teams.id OR matches.team_b_id = teams.id) WHERE games.status = 'completed'
      GROUP BY teams.id, teams.name
      ORDER BY total_games_won DESC;`;

    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const matchesCompletePromise = sql`SELECT (COUNT(CASE WHEN matches.status = 'completed' THEN 1 END) * 100.0 / COUNT(*)) AS completed_percentage FROM matches`;
    const teamCountPromise = sql`SELECT COUNT(*) FROM teams`;
    const gamesCountPromise = sql`SELECT COUNT(*) FROM games WHERE games.status = 'completed'`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    const data = await Promise.all([
      matchesCompletePromise,
      teamCountPromise,
      gamesCountPromise,
      // invoiceStatusPromise,
    ]);

    const matchesCompletePercentage = data[0].rows[0].completed_percentage
      ? `${Number(data[0].rows[0].completed_percentage).toFixed(0)}%`
      : "0%";
    const numberOfTeams = Number(data[1].rows[0].count ?? "0");
    const numberOfGames = Number(data[2].rows[0].count ?? "0");
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    return {
      numberOfTeams,
      matchesCompletePercentage,
      numberOfGames,
      // totalPaidInvoices,
      // totalPendingInvoices,
    };
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
