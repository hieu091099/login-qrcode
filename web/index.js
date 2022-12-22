let express = require("express");
let cors = require("cors");
let app = express();
const jwt_decode = require("jwt-decode");
// set public static folder
app.use(express.static(__dirname + "/public"));

// use view engine
let expressHbs = require("express-handlebars");
let hbs = expressHbs.create({
  extname: "hbs",
  defaultLayout: "index",
  layoutsDir: __dirname + "/views",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// body parser
let bodyParser = require("body-parser");
const db = require("./db");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/check/:id", (req, res) => {
  let data = req.params;
  console.log(data.id);
  let sql =
    "select * from `check` where name = '" +
    data.id +
    "' and isCheck = 0 LIMIT 1";
  console.log(sql);
  db.query(sql, function (err, results) {
    if (err) return res.status(500).json(err);

    let token = results[0] !== undefined ? results[0].token : "";
    if (token !== "") {
      let update =
        "update `check` set isCheck = 1 where name = '" +
        data.id +
        "' and isCheck = 0";
      db.query(update, function (err, results) {});
      res.status(200).json({ data: token });
    } else {
      res.status(204).json({ msg: "None" });
    }
  });
});

app.post("/check", (req, res) => {
  let data = req.body;

  var sql =
    "insert into `check` values ('" +
    data.name +
    "','" +
    data.token +
    "', 0, 0, NOW())";
  db.query(sql, function (err, results) {
    if (err) return res.status(500).json(err);
    if (results.affectedRows == 1) {
      res.status(200).json({ msg: "Successfully!!" });
    }
  });
});

db.connect(function (err) {
  if (err) console.log(err);
  app.listen(88, () => {
    console.log("Server is listening on port 88");
  });
});
