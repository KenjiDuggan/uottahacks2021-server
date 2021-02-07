// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const CREDENTIALS = JSON.parse(process.env.GOOGLE_TRANSLATE_CREDENTIALS);

// Instantiates a client
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id,
});

const quickStart = async ({ text, target }) => {
  // The text to translate
  //   const text = "Hello, world!";

  // The target language
  //   const target = "es";

  // Translates some text
  try {
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    return translation;
  } catch (error) {
    console.error("error: ", error);
    return error;
  }
};

module.exports = quickStart;
