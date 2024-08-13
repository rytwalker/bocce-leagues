// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Lebron",
    email: "user@nextmail.com",
    password: "password",
    role: "user",
  },
  {
    id: "bf371ac8-e149-4fb8-ab86-278ddbfeedaa",
    name: "Ryan",
    email: "ryan@bocce-leagues.com",
    password: "password",
    role: "superadmin",
  },
];

const leagues = [
  {
    id: "717e0bba-45a9-4047-a9ce-1355607cd78c",
    name: "Steel Valley Bocce",
    location: "Steel Valley Brew Works",
    slug: "steel-valley-brew-works",
    city: "Boardman",
    state: "Ohio",
    zip: "44512",
    google_place_id: "ChIJFy3Qe3j7M4gRljphmLRgXCQ",
    created_by: users[0].id,
  },
];

const teams = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "BB4L",
    league_id: leagues[0].id,
    image_url: "/customers/evil-rabbit.png",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Big Ballzin",
    league_id: leagues[0].id,
    image_url: "/customers/delba-de-oliveira.png",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "New Kids on the Bocce",
    league_id: leagues[0].id,
    image_url: "/customers/lee-robinson.png",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Meatballz",
    league_id: leagues[0].id,
    image_url: "/customers/michael-novotny.png",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Kathy",
    league_id: leagues[0].id,
    image_url: "/customers/amy-burns.png",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Sugar Bear",
    league_id: leagues[0].id,
    image_url: "/customers/balazs-orban.png",
  },
];

const seasons = [
  {
    id: "81eaaa93-6377-4ab7-8d15-f022130b8497",
    league_id: leagues[0].id,
    name: "Summer 2024",
    start_date: "2024-06-08",
    end_date: null,
    status: "in_progress",
  },
];

const matches = [
  {
    id: "d50c558c-67d9-491e-ab4e-54def1d4558d",
    season_id: seasons[0].id,
    team_a_id: teams[0].id,
    team_b_id: teams[1].id,
    date: "2024-06-08",
    status: "completed",
  },
  {
    id: "6a1ea637-92cc-48e8-85fc-a40d02ec4a94",
    season_id: seasons[0].id,
    team_a_id: teams[2].id,
    team_b_id: teams[3].id,
    date: "2024-06-08",
    status: "completed",
  },
  {
    id: "ab4d2ec0-56b8-40fb-a6ee-2957c65d14db",
    season_id: seasons[0].id,
    team_a_id: teams[4].id,
    team_b_id: teams[5].id,
    date: "2024-06-08",
    status: "completed",
  },
];

const games = [
  {
    match_id: matches[0].id,
    team_a_score: 15,
    team_b_score: 7,
    winning_team_id: teams[0].id,
    status: "completed",
  },
  {
    match_id: matches[0].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: teams[0].id,
    status: "completed",
  },
  {
    match_id: matches[1].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: teams[2].id,
    status: "completed",
  },
  {
    match_id: matches[1].id,
    team_a_score: 8,
    team_b_score: 15,
    winning_team_id: teams[3].id,
    status: "completed",
  },
  {
    match_id: matches[2].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: teams[4].id,
    status: "completed",
  },
  {
    match_id: matches[2].id,
    team_a_score: 13,
    team_b_score: 15,
    winning_team_id: teams[5].id,
    status: "completed",
  },
];

const leagueMemberships = [
  {
    user_id: users[0].id,
    league_id: leagues[0].id,
    role: "league_admin",
  },
];

export { users, leagues, teams, seasons, matches, games, leagueMemberships };
