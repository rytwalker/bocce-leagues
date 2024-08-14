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
  {
    id: "8060ac03-8e9f-4d54-9cb4-be8edd7ae09f",
    name: "Stonefruit",
    league_id: leagues[0].id,
    image_url: "/customers/balazs-orban.png",
  },
  {
    id: "38022c14-288e-4fbe-982c-b842fb8071b8",
    name: "Y-town Rollers",
    league_id: leagues[0].id,
    image_url: "/customers/balazs-orban.png",
  },
];

const seasons = [
  {
    id: "a4045cdd-909d-4dcd-a880-d260d07e17f9",
    league_id: leagues[0].id,
    name: "Spring 2024",
    start_date: "2024-02-15",
    end_date: "2024-05-31",
    status: "completed",
  },
  {
    id: "7b038fd4-bedd-43a0-808e-442130d2e78e",
    league_id: leagues[0].id,
    name: "Fall 2024",
    start_date: "2024-09-15",
    end_date: null,
    status: "not_started",
  },
];

const matches = [
  // week 1
  {
    id: "c9c62d30-7f5e-4718-8152-8b73446b1982",
    season_id: seasons[0].id,
    team_a_id: teams[1].id,
    team_b_id: teams[0].id,
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: "350bd68f-a8b6-4760-aa46-aa9e944432f0",
    season_id: seasons[0].id,
    team_a_id: teams[2].id,
    team_b_id: teams[7].id,
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: "8371225a-c15b-46a0-86cd-effc9088a36d",
    season_id: seasons[0].id,
    team_a_id: teams[3].id,
    team_b_id: teams[6].id,
    date: "2024-02-15",
    status: "completed",
  },
  {
    id: "054bce35-42e2-4f74-adea-ffd0b8ea853a",
    season_id: seasons[0].id,
    team_a_id: teams[4].id,
    team_b_id: teams[5].id,
    date: "2024-02-15",
    status: "completed",
  },
  // week 2
  {
    id: "51fc6ed2-8db1-49ae-a447-675ec5698c20",
    season_id: seasons[0].id,
    team_a_id: teams[2].id,
    team_b_id: teams[3].id,
    date: "2024-02-22",
    status: "completed",
  },
  {
    id: "f6f2896a-d4fb-4635-813b-f068e8ad5a3a",
    season_id: seasons[0].id,
    team_a_id: teams[0].id,
    team_b_id: teams[7].id,
    date: "2024-02-22",
    status: "completed",
  },
  {
    id: "33774ab0-0362-4e4f-a8c8-37b04e42a927",
    season_id: seasons[0].id,
    team_a_id: teams[7].id,
    team_b_id: teams[5].id,
    date: "2024-02-22",
    status: "completed",
  },
  {
    id: "d370d719-b537-41bf-bda2-12beb10f9a65",
    season_id: seasons[0].id,
    team_a_id: teams[1].id,
    team_b_id: teams[4].id,
    date: "2024-02-22",
    status: "completed",
  },
  // week 3
  {
    id: "08a34803-b1d9-48e3-a30a-f805df2000f6",
    season_id: seasons[0].id,
    team_a_id: teams[5].id,
    team_b_id: teams[1].id,
    date: "2024-02-29",
    status: "completed",
  },
  {
    id: "540958f4-5aae-4ddb-950f-e5350bb878fe",
    season_id: seasons[0].id,
    team_a_id: teams[6].id,
    team_b_id: teams[7].id,
    date: "2024-02-29",
    status: "completed",
  },
  {
    id: "804afef1-08ff-4e2c-a45f-78f3462e9d47",
    season_id: seasons[0].id,
    team_a_id: teams[3].id,
    team_b_id: teams[0].id,
    date: "2024-02-29",
    status: "completed",
  },
  {
    id: "a8db11ca-f1be-4e22-b5f4-0d9d6a65eea4",
    season_id: seasons[0].id,
    team_a_id: teams[4].id,
    team_b_id: teams[2].id,
    date: "2024-02-29",
    status: "completed",
  },
  // week4
  {
    id: "0498f3f2-f83a-4484-95fd-2661cad8d04b",
    season_id: seasons[0].id,
    team_a_id: teams[6].id,
    team_b_id: teams[4].id,
    date: "2024-03-07",
    status: "completed",
  },
  {
    id: "8382c7a2-5309-44d9-b79b-960927c1225c",
    season_id: seasons[0].id,
    team_a_id: teams[7].id,
    team_b_id: teams[3].id,
    date: "2024-03-07",
    status: "completed",
  },
  {
    id: "cf9a2f90-78e7-4215-8490-b5a7138e4abd",
    season_id: seasons[0].id,
    team_a_id: teams[1].id,
    team_b_id: teams[2].id,
    date: "2024-03-07",
    status: "completed",
  },
  {
    id: "721424c5-2e57-453b-8d87-e4a3ec296ced",
    season_id: seasons[0].id,
    team_a_id: teams[5].id,
    team_b_id: teams[1].id,
    date: "2024-03-07",
    status: "completed",
  },
];

const games = [
  {
    match_id: matches[0].id,
    team_a_score: 15,
    team_b_score: 7,
    winning_team_id: matches[0].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[0].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[0].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[1].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[1].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[1].id,
    team_a_score: 8,
    team_b_score: 15,
    winning_team_id: matches[1].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[2].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[2].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[2].id,
    team_a_score: 13,
    team_b_score: 15,
    winning_team_id: matches[2].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[3].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[3].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[3].id,
    team_a_score: 10,
    team_b_score: 15,
    winning_team_id: matches[2].team_b_id,
    status: "completed",
  },
  // week 2
  {
    match_id: matches[4].id,
    team_a_score: 15,
    team_b_score: 7,
    winning_team_id: matches[4].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[4].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[4].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[5].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[5].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[5].id,
    team_a_score: 8,
    team_b_score: 15,
    winning_team_id: matches[5].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[6].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[6].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[6].id,
    team_a_score: 13,
    team_b_score: 15,
    winning_team_id: matches[6].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[7].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[7].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[7].id,
    team_a_score: 10,
    team_b_score: 15,
    winning_team_id: matches[7].team_b_id,
    status: "completed",
  },
  // week 3
  {
    match_id: matches[8].id,
    team_a_score: 15,
    team_b_score: 7,
    winning_team_id: matches[8].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[8].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[8].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[9].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[9].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[9].id,
    team_a_score: 8,
    team_b_score: 15,
    winning_team_id: matches[9].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[10].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[10].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[10].id,
    team_a_score: 13,
    team_b_score: 15,
    winning_team_id: matches[10].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[11].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[11].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[11].id,
    team_a_score: 10,
    team_b_score: 15,
    winning_team_id: matches[11].team_b_id,
    status: "completed",
  },
  // week 4
  {
    match_id: matches[12].id,
    team_a_score: 15,
    team_b_score: 7,
    winning_team_id: matches[12].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[12].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[12].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[13].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[13].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[13].id,
    team_a_score: 8,
    team_b_score: 15,
    winning_team_id: matches[13].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[14].id,
    team_a_score: 15,
    team_b_score: 9,
    winning_team_id: matches[14].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[14].id,
    team_a_score: 13,
    team_b_score: 15,
    winning_team_id: matches[14].team_b_id,
    status: "completed",
  },
  {
    match_id: matches[15].id,
    team_a_score: 15,
    team_b_score: 3,
    winning_team_id: matches[15].team_a_id,
    status: "completed",
  },
  {
    match_id: matches[15].id,
    team_a_score: 10,
    team_b_score: 15,
    winning_team_id: matches[15].team_b_id,
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

const teamSeasons = [
  {
    season_id: seasons[0].id,
    team_id: teams[0].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[1].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[2].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[3].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[4].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[5].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[6].id,
  },
  {
    season_id: seasons[0].id,
    team_id: teams[7].id,
  },
];

export {
  users,
  leagues,
  teams,
  seasons,
  matches,
  games,
  leagueMemberships,
  teamSeasons,
};
