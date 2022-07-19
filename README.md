<h1 align="center">Tombala!</h1>

A tombala game made with React, Express and Socket.io.

<h2 align="center">How to run?</h2>
<hr/>

This project is currently in development. So there may be problems in this section.

## Frontend

-   If you want to run project with express server, you should build the project with webpack:

```
cd ./client/
npm run dev
```

This will bundle React app and put it to client/static/bundled/bundled.js. Express will look for files in client/static folder to handle static files.

After running webpack, you can run express server. Look at [backend section](#backend) for it.

-   If you just want to view ui, you can run only React:

```
cd ./client/
npm start
```

## Backend

```
# Pay attention to points!
cd ./backend/
npm run dev
```
