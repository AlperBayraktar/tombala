// .env loader
/*
    env fields: 
            - PSQL_USER: 
                - string
                - default value is "postgres"

            - PGSQL_PASSWORD:
                - string
                - must be provided

            - PGSQL_HOST:
                - string
                - default value is "localhost"

            - PSQL_PORT:
                - integer
                - default value is 5432
*/

import { load } from "ts-dotenv";

const env = load({
    PGSQL_USER: {
        type: String,
        default: "postgres",
    },
    PGSQL_PASSWORD: {
        type: String,
        optional: false,
    },
    PGSQL_HOST: {
        type: String,
        default: "localhost",
    },
    PGSQL_PORT: {
        type: Number,
        default: 5432,
    },
});

export default env;
