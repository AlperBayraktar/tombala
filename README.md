# Tombala

![image](https://user-images.githubusercontent.com/85285027/180843689-7071c87c-e0e1-48a1-9f2c-61ba85bc8756.png)

A tombala game created with [NextJS](https://nextjs.org/), [PostgreSQL](https://www.postgresql.org/), [Socket.IO](https://socket.io/)

## Features

-   Creating a lobby
-   Joining to a lobby
-   'Sayi cek' process

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

-   To copy path of your pg folder in suitable format, you can run pg/copy_path.py. **(Make sure you have clipboard lib installed)**

#### Create .env in root of project

Don't forget .env file. Required values are:

-   `PGSQL_USER`:

    -   string
    -   default value is "postgres"

-   `PGSQL_PASSWORD`:

    -   string
    -   must be provided

-   `PGSQL_HOST`:

    -   string
    -   default value is "localhost"

-   `PGSQL_PORT`:
    -   integer
    -   default value is 5432

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
