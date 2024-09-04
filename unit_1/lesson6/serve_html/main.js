"use strict";

// Listing 6.2 Page 61 - 62
// const port = 3000,
//   http = require("http"),
//   httpStatus = require("http-status-codes"),
//   fs = require("fs");

// // const routeMap = {
// //     "/": "views/index.html" // is a home routing "/"
// // };
// // http
// //     .createServer((req, res) => {
// //         res.writeHead(httpStatus.OK, {
// //             "Content-Type": "text/html"
// //         });
// //         if (routeMap[req.url]) {
// //             fs.readFile(routeMap[req.url], (error, data) => {
// //                 res.write(data);
// //                 res.end();
// //             });
// //         } else {
// //             res.end("<h1>Sorry, not found.</h1>");
// //         }
// //     })
// //     .listen(port);
// // console.log(`The server has started and is listening on port number: ${port}`);

// //Page 63 Listing 6.3
// const port = 3000,
//     http = require("http"),
//     httpStatus = require("http-status-codes"),
//     fs = require("fs");

// const getViewUrl = url => {
//     return `views${url}.html`;
// };
// http
//     .createServer((req, res) => {
//         let viewUrl = getViewUrl(req.url);
//         fs.readFile(viewUrl, (error, data) => {
//             if (error) {
//                 res.writeHead(httpStatus.NOT_FOUND);
//                 res.write("<h1>FILE NOT FOUND</h1>");
//             } else {
//                 res.writeHead(httpStatus.OK, {
//                     "Content-Type": "text/html"
//                 });
//                 res.write(data);
//             }
//             res.end();
//         });
//     })
//     .listen(port);
// console.log(`The server has started and is listening on port number: ${port}`);

// const sendErrorResponse = (res) => {
//   res.writeHead(httpStatus.NOT_FOUND, {
//     "Content-Type": "text/html",
//   });
//   res.write("<h1>File Not Found!</h1>");
//   res.end();//js file
// };

// http.createServer((req, res) => {
//     let url = req.url;
//     if (url.indexOf(".html") !== -1) {//if the file is not html file
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/html",
//       });
//       customReadFile(`./views${url}`, res);//responds with index.html
//     } else if (url.indexOf(".js") !== -1) {//js file
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/javascript",
//       });
//       customReadFile(`./public/js${url}`, res);//test.js
//     } else if (url.indexOf(".css") !== -1) {//css file
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "text/css",
//       });
//       customReadFile(`./public/css${url}`, res);//test css
//     } else if (url.indexOf(".png") !== -1) {//png
//       res.writeHead(httpStatus.OK, {
//         "Content-Type": "image/png",
//       });
//       customReadFile(`./public/images${url}`, res);//test.png
//     } else {
//       sendErrorResponse(res);//error nessage
//     }
//   })
//   .listen(3000);
// console.log(`The server is listening on port number: ${port}`);
// const customReadFile = (file_path, res) => {
//   if (fs.existsSync(file_path)) {
//     fs.readFile(file_path, (error, data) => {
//       if (error) {
//         console.log(error);
//         sendErrorResponse(res);
//         return;
//       }
//       res.write(data);
//       res.end();
//     });
//   } else {
//     sendErrorResponse(res);
//   }
// };

const port = 3000;
const http = require("http");
const httpStatusCodes = require("http-status-codes");
const router = require("./router");
const fs = require("fs");

const plainTextContentType = {
  "Content-Type": "text/plain",
};

const htmlContentType = {
  "Content-Type": "text/html",
};

const customReadFile = (file, res) => {//create a custom readfile function to reduce code repetation
  fs.readFile(`./${file}`, (errors, data) => {
    if (errors) {
      console.log("Error reading the file...");
    }
    res.end(data);
  });
};

router.get("/", (req, res) => {//register routes with get and post
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer(router.handle).listen(3000);//handle all request through router.js
console.log(`The server is listening on port number:${port}`);
