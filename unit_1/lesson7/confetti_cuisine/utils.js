const fs = require("fs");
const httpStatus = require("http-status-codes");
const contentTypes = require("./contentTypes");//importing modules for use in getfile

module.exports = {// Exporting a function to read files and return a response
    
  getFile: (file, res) => {
    fs.readFile(`./${file}`, (error, data) => {

      if (error) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
        res.end("There was an error serving content!");
      }
      res.end(data);
    });

  },
};
