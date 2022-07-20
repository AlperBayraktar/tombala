<h1 align="center">Tombala!</h1>

A tombala game made with React, Express and Socket.io.

<h2 align="center">How to run?</h2>

This project is currently in development. So there may be problems in this section.

## DB

-   This project uses PostgreSQL as db. Before running the project, create a database called `tombala` and run these commands:

```bash
# Don't forget to set username (you can use 'postgres' as user, postgres has every permission)
psql -U username
# After providing the password for user, run this (don't forget to set path):
\i path_to_your_pg/setup.sql_file
```

-   Your database is ready. Now you can look at [frontend](#frontend) and [backend](#backend) sections to run website.

## Frontend

-   Bundle React app with webpack:

```
cd ./client/
npm run dev
```

This will bundle React app and put it to `client/static/bundled/bundled.js`. Express will look for files in `client/static` folder to handle static files.

After running webpack, you can run express server. Look at [backend section](#backend) for it.

-   Changes happen to React app will not be reactive on Express server, you have to wait for webpack to bundle with changed files and then reload page manually. But running it on localhost:3000 using react-scripts will make it reactive without needing to reload page to see changes.

-   When you run it in localhost:3000, you will be able to view ui reactively, but you can't communicate with Express since there is no CORS
    settings.

-   For running in localhost:3000:

```
cd ./client/
npm start
```

## Backend

```
cd ./backend/
npm run dev
```

-   You are ready! Project is running on localhost:8080 now.
