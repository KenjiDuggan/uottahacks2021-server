const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const quickStart = require("./translate/translate");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/article", async (req, res) => {
  console.log("req", req.body);
  console.log(req.body.key);
  console.log(req.body.language);

  let translation = "";

  // check if database has a translation in this language for this key
  const isNativeTranslation = false;
  // translation = fetchnews(req.body.key, language)

  // if not, get content and feed it to Google Translation

  // const content = fetchnews(key)
  const content = "hello";

  // const translation = translate()
  if (!isNativeTranslation) {
    translation = await quickStart({
      text: content,
      target: req.body.language,
    });
  }

  res.send({ express: { translation, isNativeTranslation } });
});

app.post("/api/submit-translation", (req, res) => {
  console.log(req.body.post);
  console.log(req.body.title);
  console.log(req.body.key);
  console.log(req.body.language);

  // Add key, post (i.e. translation) and language to database

  // add error handling?
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
