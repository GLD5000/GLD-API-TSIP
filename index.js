// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  console.log("helloxxxsdvsodmvsx");
  res.sendFile(__dirname + "/views/index.html");
});

function processDateString(input){
  if (input.length = 0) return new Date();
 const parsedDateNumber = new Date(Number(input));
 const isInvalidDate = parsedDateNumber.toString() === "Invalid Date";
if (!isInvalidDate) return parsedDateNumber;

  return new Date(input);
}
// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const stringIn = processDateString(req.params.date);
  const newDate = processDateString(stringIn);
  const isInvalidDate = newDate.toString() === "Invalid Date";
  if (isInvalidDate) return res.json({ error : "Invalid Date" });
  const utc = newDate.toUTCString();
  const unix = newDate.getTime();
console.log('utc:', utc);
console.log('unix:', unix);
  // console.log("isDateString:", isDateString);
  // console.log("To UTCstring:", new Date(stringIn).toUTCString());
  // console.log("getTime:", new Date(stringIn).getTime());
  // console.log("Date.parse():", Date.parse(new Date(stringIn)));
  // console.log(
  //   "UTX To UTCstring:",
  //   new Date(Date.parse(new Date(stringIn))).toUTCString()
  // );
  // console.log("fudgeddate:", new Date("fudgeddate"));
  // console.log(
  //   "fudgeddate:",
  //   "Invalid Date" === new Date("fudgeddate").toString()
  // );
  res.json({ unix: unix, utc: utc });
});

app.get("/", function (req, res) {});

// listen for requests :)
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
