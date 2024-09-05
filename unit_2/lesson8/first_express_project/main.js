const port = 3000;
const express = require("express");

//initialise express
const app = express();

app.get("/", (req, res) => {
    res.send("Hello, Universe!");
  });
  
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });
