// DB connection creator

import env from "./env";
import { Pool } from "pg";

let DB = new Pool({
    user: env.PGSQL_USER,
    password: env.PGSQL_PASSWORD,
    host: env.PGSQL_HOST,
    port: env.PGSQL_PORT,
    database: "tombala",
});

export default DB;
