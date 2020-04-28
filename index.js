const express = require("express");
const app = express();
app.set("view engine", "ejs");
var fetch = require("node-fetch");

function getCryptos(code) {
  return fetch("https://api.n.exchange/en/api/v1/currency")
    .then((cryptoData) => cryptoData.json())
    .then((cryptoData) => {
      return cryptoData.filter((crypto) => crypto.code == code);
    })
    .catch((err) => console.log(err));
}
app.get("/", (req, res) => {
  const code = req.query.code;

  getCryptos(code)
    .then((cryptoData) => {
      res.render("home", { cryptoData: cryptoData });
    })
    .catch((err) => console.log(err));
});
app.listen(process.env.PORT || 3000, () => {
  console.log("Example app listening to port 3000");
});
