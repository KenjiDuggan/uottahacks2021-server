const async = require("async");
const fs = require("fs");
const pg = require("pg");
const getArticleContent = require("./getArticleContent");

// Connect to the database
var config = {
  user: "uohacker",
  host: "localhost",
  database: "uottahack2021",
  port: 26257,
};

// Note: currently parses json synchronously
function uploadToDb(resource) {
  let result = JSON.parse(JSON.stringify(resource));
  let text = getArticleContent(result.articles[0].url);
}

// POSSIBLE OBSOLETE CODE IF WE'RE SWITCHING TO CASSANDRA
// function connectToDb(articleDetails, articleText) {
//   var pool = new pg.Pool(config);

//   pool.connect(function (err, client, done) {
//     // Close communication with the database and exit.
//     var finish = function () {
//       done();
//       process.exit();
//     };

//     if (err) {
//       console.error("could not connect to cockroachdb", err);
//       finish();
//     }
//     async.waterfall(
//       [
//         function (next) {
//           // Insert json data into the articles table
//           client.query(
//             "INSERT INTO articles (id, url) VALUES (1, 1000), (2, 250);",
//             next
//           );
//         },

//         function (results, next) {
//           // Print out account balances.
//           client.query("SELECT id, balance FROM accounts;", next);
//         },
//       ],
//       function (err, results) {
//         if (err) {
//           console.error(
//             "Error inserting into and selecting from articles: ",
//             err
//           );
//           finish();
//         }

//         console.log("Initial balances:");
//         results.rows.forEach(function (row) {
//           console.log(row);
//         });

//         finish();
//       }
//     );
//   });
// }

// Export module
module.exports = uploadToDb;
