// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin" | "user";
};

export type League = {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  zip: string;
  google_place_id: string;
  created_by: string;
};

export type Team = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Season = {
  id: string;
  league_id: string;
  name: string;
  start_date?: string;
  end_date?: string;
  status: "not_started" | "in_progress" | "completed";
};

export type Match = {
  id: string;
  season_id: string;
  team_a_id: string;
  team_b_id: string;
  date?: string;
  status: "not_started" | "in_progress" | "completed";
};

export type Game = {
  id: string;
  match_id: string;
  team_a_score: number;
  team_b_score: number;
  winning_team_id: string;
  status: "not_started" | "in_progress" | "completed";
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};
