const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const quickStart = require("./translate/translate");
const query = require("./dataaccesslater/queryDb");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/article", async (req, res) => {
  console.log(req.body.key);
  console.log(req.body.language);

  let translation = "";
  let isCustomTranslation;

  // check if database has a translation in this language for this key (including the title)
  // set isCustomTranslation true if database finds an existing translation in that language
  let queryResult;
  var checkTranslation = function () {
    queryResult = queryDb(
      "SELECT EXISTS(SELECT translation " +
        " FROM translations T " +
        " INNER JOIN articles A " +
        " ON T.articleId = A.url " +
        " INNER JOIN languages L " +
        " ON L.languageCode = " +
        req.body.language +
        " WHERE A.url = " +
        req.body.key +
        ");"
    );
  };
  if (queryResult == "true") {
    isCustomTranslation = true;
  } else {
    isCustomTranslation = false;
  }
  const title =
    "Patrulla de patinaje: Oficiales de la Ordenanza de Ottawa patrullan el Rideau Canal Skateway este fin de semana para hacer cumplir las medidas COVID-19";

  // if not, get content and feed it to Google Translation
  content = queryDb(
    "SELECT content FROM articles WHERE url = " + req.body.key + ";"
  );

  if (!isCustomTranslation) {
    // const content = fetchnews(req.body.key, language)
    translation = await quickStart({
      text: content,
      target: req.body.language,
    });

    // if you aren't using Google Translate API, just return English translation
    // translation = content
    if (!isCustomTranslation) {
      translation = content;
    }
  }

  res.send({ express: { translation, title, isCustomTranslation } });
});

app.post("/api/submit-translation", (req, res) => {
  console.log(req.body.post);
  console.log(req.body.title);
  console.log(req.body.key);
  console.log(req.body.language);

  // Add key, post (i.e. translation) and language to database

  res.send(`Thank you for submitting a translation`);
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
