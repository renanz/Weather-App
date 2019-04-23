const path = require("path");
const express = require("express");
const hbs = require("hbs");

// Forecast API
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Renan Zelaya" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Renan Zelaya" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Renan Zelaya",
    message: "Some help message"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) return res.send({ error: "Address must be provided" });

  geocode(
    address,
    (err, { latitude, longitude, place_name: location } = {}) => {
      if (err) return res.send({ error: err });
      forecast(latitude, longitude, (err, forecastData) => {
        if (err) return res.send({ error: err });
        res.send({ location, forecast: forecastData, address });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Renan Zelaya"
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
