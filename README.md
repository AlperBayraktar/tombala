# Tombala

![image](https://user-images.githubusercontent.com/85285027/180843689-7071c87c-e0e1-48a1-9f2c-61ba85bc8756.png)

A tombala game created with [NextJS](https://nextjs.org/), [PostgreSQL](https://www.postgresql.org/), [Socket.IO](https://socket.io/)

[](https://img.shields.io/badge/license-Apache-blue)

## Color Reference

| Color     | Hex                                                              |
| --------- | ---------------------------------------------------------------- |
| dark-bg   | ![#011a27](https://via.placeholder.com/10/011a27?text=+) #0a192f |
| text-blue | ![#7495f0](https://via.placeholder.com/10/7495f0?text=+) #7495f0 |
| blue      | ![#13678a](https://via.placeholder.com/10/13678a?text=+) #13678a |
| lightblue | ![#1885b4](https://via.placeholder.com/10/1885b4?text=+) #1885b4 |
| dark-gray | ![#010c13](https://via.placeholder.com/10/010c13?text=+) #010c13 |
| text-gray | ![#ece8e8](https://via.placeholder.com/10/ece8e8?text=+) #ece8e8 |
| text-gray | ![#d1cbcb](https://via.placeholder.com/10/d1cbcb?text=+) #d1cbcb |
| white     | ![#fff](https://via.placeholder.com/10/d1cbcb?text=+) #fff       |

## Features

-   Currently, you can create a lobby. When you create a lobby:
    -   App inserts player data in players table
    -   And creates a lobby by
        -   connecting socket to a room
        -   and creating a new lobby in table

## Environment Variables

-   `PSQL_USER`:

    -   string
    -   default value is "postgres"

-   `PGSQL_PASSWORD`:

    -   string
    -   must be provided

-   `PGSQL_HOST`:

    -   string
    -   default value is "localhost"

-   `PSQL_PORT`:
    -   integer
    -   default value is 5432

## Install & Run

### Clone the repo:

```bash
git clone https://github.com/AlperBayraktar/tombala.git
cd ./tombala
```

### Setup DB

#### Create db and tables

-   This project uses PostgreSQL as db. Create a database named `tombala` and then run these commands:

```bash
# Don't forget to set username ( 'postgres' can be used )
psql -U username
# Select database
\c tombala
# Run your db setup
\i path_to_your_pg/dbSetup.sql_file
```

#### Create .env in root of project

Don't forget .env file. Required values are specified above.

### Install dependencies with npm

```bash
  npm install
```

### Run project

```bash
 npm run dev
```

#### 🎉Your app is now ready on port 3000!🎉

## Tech Stack

**Client:** [React](https://reactjs.org/) ( [NextJS](https://nextjs.org/) ), [Socket.IO](https://socket.io/)

**Server:** [NextJS](https://nextjs.org/), [PostgreSQL](https://www.postgresql.org/), [Socket.IO](https://socket.io/)

## Authors

-   [Alper Bayraktar](https://www.github.com/AlperBayraktar)

## License

[![APACHE LICENSE](https://img.shields.io/badge/license-Apache-blue)](https://choosealicense.com/licenses/apache-2.0/)
