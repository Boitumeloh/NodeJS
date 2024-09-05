const homeController = require("./controllers/homeController");
const port = 3000;
const express = require("express");

//initialise express
const app = express();

app.use((req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
});

app.use(
  express.urlencoded({
    extended: false,
  })
);

//data will be parsed to json format
app.use(express.json());

// app.post("/contact", (req, res) => {
//   res.send("Contact information submitted successfully.");
// });

app.post("/", homeController.sendPost);

app.get("/items/:vegetable", homeController.sendReqParam);

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
