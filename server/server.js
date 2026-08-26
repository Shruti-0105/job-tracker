const express = require("express");
const cors = require("cors");

const applicationRoutes = require(
  "./routes/applicationRoutes"
);

const app = express();

const PORT = 5001;


// Middleware

app.use(cors());

app.use(express.json());


// Home route

app.get("/", (req, res) => {

  res.send(
    "Internship & Job Tracker API is running!"
  );

});


// Application routes

app.use(
  "/api/applications",
  applicationRoutes
);


// Start server

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});