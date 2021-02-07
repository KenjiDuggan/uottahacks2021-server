const NewsAPI = require("newsapi");
const uploadToDb = require("./uploadnews");
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.NEWSAPI - KEY);

const newsapi = new NewsAPI(CREDENTIALS);

// Calculate current date and past date
var currentDate = new Date();
var pastDate = new Date();
pastDate.setDate(currentDate.getDate() - 1);

// Make sure dates are in ISO 8601 format - yyyy-mm-dd
currentDate =
  String(currentDate.getFullYear()) +
  "-" +
  String(currentDate.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(currentDate.getDate()).padStart(2, "0");
pastDate =
  String(pastDate.getFullYear()) +
  "-" +
  String(pastDate.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(pastDate.getDate()).padStart(2, "0");

// Find relevant articles using NewsAPI
// newsapi.v2.everything({
//   q: 'covid+AND+ontario',
//   from: pastDate,
//   to: currentDate,
//   language: 'en',
//   sortBy: 'relevancy',
//   page: 1
// }).then(response => {
//     uploadToDb(response);
// })
// .catch((error) => {
//     console.log(error.message);
// });

var exampleData = {
  status: "ok",
  totalResults: 1,
  articles: [
    {
      source: { id: null, name: "Ctvnews.ca" },
      author: null,
      title:
        "Ontario reports more than 1600 new COVID-19 cases, 45 deaths while citing 'overestimation' in Toronto - CTV Toronto",
      description:
        "<ol><li>Ontario reports more than 1600 new COVID-19 cases, 45 deaths while citing 'overestimation' in Toronto  CTV Toronto\r\n" +
        "</li><li>Ontario finds more cases of highly contagious variants of COVID-19  CityNews Toronto\r\n" +
        "</li><li>Ontario reports a slight increa…",
      url:
        "https://toronto.ctvnews.ca/ontario-reports-more-than-1-600-new-covid-19-cases-45-deaths-while-citing-overestimation-in-toronto-1.5297089",
      urlToImage:
        "https://www.ctvnews.ca/polopoly_fs/1.5297116.1612536253!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg",
      publishedAt: "2021-02-05T15:15:00Z",
      content:
        "TORONTO -- \r\n" +
        "Ontario reported more than 1,600 new cases of COVID-19 Friday and 45 more deaths related to the disease while citing an overestimation in Torontos count due to a data migration.\r\n" +
        "The 1,6… [+1794 chars]",
    },
  ],
};

uploadToDb(exampleData);
