const url = require("url");
const Q = require("q")
// const mongo = require("./db")
const { Connection } = require("./db.js");

exports.getEmployee = function(req, res) {
  const reqUrl = url.parse(req.url, true);
  var name = "World";
  if (reqUrl.query.name) {
    name = reqUrl.query.name;
  }

  var response = {
    text: "Hello " + name
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(response));
};

exports.editEmployee = function(req, res) {
  body = "";

  req.on("data", function(chunk) {
    body += chunk;
  });

  req.on("end", function() {
    postBody = JSON.parse(body);

    var response = {
      text: "Post Request Value is  " + postBody.value
    };

    // const mongo = require("./db");
    // mongo(db => {
    //   //here get db handler
    // });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(response));
  });
};

exports.addEmployee = function(req, res) {
  body = "";

  req.on("data", function(chunk) {
    body += chunk;
  });

  req.on("end", function() {
    postBody = JSON.parse(body);
    const { org } = req.headers;
    const { id, parent, data } = postBody;

    //check if there is a user with this ID
    const checkExistence = Q.all([
      Connection.db.collection("dataStorage").findOne({ id }),
      Connection.db.collection("dataMap").findOne({ id })
    ]);
    checkExistence
    .then((result) => {
      if(result[0] !=null || result[1] !=null){
        throw new Error('this user is exist')
      }
      return Q.all([
        //id , data , org
        Connection.db.collection("dataStorage").insertOne({ id, data, org }),
        //id , parent
        Connection.db.collection("dataMap").insertOne({ id, parent })
      ])
    })  
    .then(() => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end("id, parent is saved");

      })
    .catch(error =>{
       res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(error.message);
    })
  })
};

exports.invalidRequest = function(req, res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Invalid Request");
};
