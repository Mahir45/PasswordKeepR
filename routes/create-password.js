const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// GET requests

// Renders Create New Password page
router.get("/create", (req, res) => {
  res.render("password_create");
  return router;
});

// POST requests
router.post("/create", (req, res) => {
  res.redirect("/passwords");
  return router;
});

module.exports = router;
