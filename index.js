// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  console.log("helloxxxsdvsodmvsx");
  console.log('process.env.PORT:', process.env.PORT);

  res.sendFile(__dirname + "/views/index.html");
});

function processDateString(input){
  console.log('input:', input);
  if (!input ||input.length === 0) return new Date();
 const parsedDateNumber = new Date(Number(input));
 const isInvalidDate = parsedDateNumber.toString() === "Invalid Date";
if (!isInvalidDate) return parsedDateNumber;

  return new Date(input);
}
// your first API endpoint...
app.get("/api/whoami", function (req, res) {
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
   return res.json({ipaddress:ipaddress,language:language,
    software:software});
  });



app.get("/api/:date?", function (req, res) {
  const stringIn = processDateString(req.params.date);
  const newDate = processDateString(stringIn);
  const isInvalidDate = newDate.toString() === "Invalid Date";
  if (isInvalidDate) return res.json({ error : "Invalid Date" });
  const utc = newDate.toUTCString();
  const unix = newDate.getTime();
  res.json({ unix: unix, utc: utc });
});  


app.get("/", function (req, res) {});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
