const http = require("http");
const url = require("url");

const service = require("./service.js");

module.exports = http.createServer((req, res) => {
  
  const reqUrl = url.parse(req.url, true);

  // GET Endpoint
  if (reqUrl.pathname == "/dataService" && req.method === "GET") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);
    service.getEmployee(req, res);
  }
  // POST Endpoint
  else if (reqUrl.pathname == "/dataService" && req.method === "POST") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);
    service.editEmployee(req, res);
  }
  // PUT Endpoint
  else if (reqUrl.pathname == "/dataService" && req.method === "PUT") {
    console.log("Request Type:" + req.method + " Endpoint: " + reqUrl.pathname);
    service.addEmployee(req, res);
  }
  // false Endpoint
  else {
    console.log(
      "Request Type:" + req.method + " Invalid Endpoint: " + reqUrl.pathname
    );
    service.invalidRequest(req, res);
  }
});
