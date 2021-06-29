const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

const apiKey = "793d3c3f7360e43dfbaf67dccc81ae76";
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("index", { weather: null, error: null });
});

app.post("/", function (req, res) {
  var city = req.body.city;
  var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  request(url, function (error, response, body) {
    if (error) {
      res.render("index", { weather: null, error: "error please try again" });
    } else {
      var weather = JSON.parse(body);
      console.log(weather);
      if (weather.main == undefined) {
        res.render("index", { weather: null, error: "error please try again" });
      } else {
          var temp = (weather.main.temp - 32)*5/9;
        var weather_text = `It's ${temp} degrees in ${weather.name}`;
        res.render("index", { weather: weather_text, error: null });
      }
    }
  });
});
app.listen(3000, function () {
  console.log("app is running on port3000");
});
