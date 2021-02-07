const queryDb = require("./dataaccesslater/queryDb");
const query = require("./dataaccesslater/queryDb");

// Note: currently parses json synchronously
function uploadToDb(resource) {
  let result = JSON.parse(JSON.stringify(resource));
  // update to just use sample content from news api
  //let articles = getArticleContent(result.articles);
  let articles = result.articles;

  for (var i = 0; i < articles.length; i++) {
    let queryStr = articleInsertQuery(articles[i]);
    queryDb(queryStr);
    //console.log(queryStr);
    //queryDb(queryStr);
    //let queryResult = queryDb("SELECT * FROM articles;");
    //console.log(typeof queryResult);
    //queryDb("DELETE FROM articles;");
    // let content = queryDb(
    //   "SELECT content FROM articles WHERE url = " + "'test url'" + ";"
    // );
    // console.log(content);
    // let queryResult;
    // var checkTranslation = function () {
    //   queryResult = queryDb("SELECT * FROM articles;");
    // };
    // const promise = new Promise(checkTranslation).then(
    //   console.log(queryResult)
    // );
  }
}

function articleInsertQuery(article) {
  let sourceId = article.source.id;
  if (sourceId != null) sourceId = sourceId.replace(/'/g, '"');
  let sourceName = article.source.name.replace(/'/g, '"');
  let title = article.title.replace(/'/g, '"');
  let author = article.author;
  if (sourceId != null) sourceId = sourceId.replace(/'/g, '"');
  let description = article.description.replace(/'/g, '"');
  let urltoimage = article.urlToImage.replace(/'/g, '"');
  let publishedAt = article.publishedAt.replace(/'/g, '"');
  let content = article.content.replace(/'/g, '"');

  let queryStrCmd =
    "INSERT INTO articles (sourceid, sourcename, title, author, description, urltoimage, publishedAt, content) ";
  let queryStrParam =
    "VALUES ('" +
    sourceId +
    "', '" +
    sourceName +
    "', '" +
    title +
    "', '" +
    author +
    "', '" +
    description +
    "', '" +
    urltoimage +
    "', '" +
    publishedAt +
    "', '" +
    content +
    "');";

  return queryStrCmd + queryStrParam;
}

// Export module
module.exports = uploadToDb;
