const async = require("async");
const fs = require("fs");
const pg = require("pg");

function queryDb(queryStr) {
  // Connect to the database
  var config = {
    user: "uohacker",
    host: "localhost",
    database: "uottahack2021",
    port: 26257,
  };

  var pool = new pg.Pool(config);

  pool.connect(function (err, client, done) {
    // Close communication with the database and exit.
    var finish = function () {
      done();
      process.exit();
    };

    if (err) {
      console.error("could not connect to cockroachdb", err);
      finish();
    }
    async.waterfall(
      [
        function (next) {
          // Insert json data into the articles table
          client.query(queryStr, next);
        },
      ],
      function (err, results) {
        if (err) {
          console.error(
            "Error executing query " + queryStr + ": " + err.message
          );
          finish();
        }

        console.log("Query result:");
        results.rows.forEach(function (row) {
          console.log(row);
        });
        console.log("Success");

        finish();
      }
    );
  });
}

module.exports = queryDb;
