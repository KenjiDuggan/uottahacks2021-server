// const projectId = 'projectId';
// const location = 'us-central1';
// const modelId = 'YOUR_MODEL_ID';

// Imports the Google Cloud AutoML library
const { PredictionServiceClient } = require("@google-cloud/automl").v1;
const fs = require("fs");

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.
const content = fs.readFileSync(filePath, "utf8");

async function predict() {
  // Construct request
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      textSnippet: {
        content: content,
      },
    },
  };

  const [response] = await client.predict(request);

  console.log(
    "Translated content: ",
    response.payload[0].translation.translatedContent.content
  );
}

predict();
