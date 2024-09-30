const port = 3000;
const express = require("express");

//initialise express
const app = express();

app.get("/", (req, res) => {
  console.log(req.params);
  
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
  res.send("Hello, Universe!");
});

app.listen(port, () => {
  console.log(
    `The Express.js server has started and is listening on port number: ${port}`
  );
});
