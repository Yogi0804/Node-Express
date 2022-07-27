const { resolveSoa } = require("dns");
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyparser = require("body-parser");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(bodyparser.json());
app.all("/dishes", (req, res, next) => {
  res.status = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

app.get("/dishes", (req, res, next) => {
  res.statusCode = 403;
  res.end("will send all dishes to you");
});

app.post("/dishes", (req, res, next) => {
  res.end(
    `Will add the dish: ${req.body.name} With details ${req.body.description}`
  );
});

app.put("/dishes", (req, res, next) => {
  res.end(`Put operation is not supported on /dishes`);
});

app.delete("/dishes", (req, res, next) => {
  res.end("Deleting send all dishes");
});

app.get("/dishes/:dishId", (req, res, next) => {
  res.end(`will send the details of the dishes: ${req.params.dishId} to you`);
});

app.post("/dishes/:dishId", (req, res, next) => {
  res.end(`POST operation is not supported on /dishes/:${req.params.dishId}`);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId);
  res.end(
    `will update the dish with:${req.body.name} and with ${req.body.description}`
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.end(`will delete dish with dishId ${req.params.dishId} for you`);
});

app.use(express.static(__dirname + "/public"));

// app.use((req, res, next) => {
//   console.log("printing yogi request headers = ", req.headers);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<html><body><h1>hello this is an express server</h1></body></html>");
// });

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
