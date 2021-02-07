import projectID from "./projectId";

const location = "us-central1";
const displayName = "covid-translate-uottahack";

// Imports the Google Cloud AutoML library
const { AutoMlClient } = require("@google-cloud/automl").v1;

// Instantiates a client
const client = new AutoMlClient();

async function createDataset() {
  // Construct request
  const request = {
    parent: client.locationPath(projectId, location),
    dataset: {
      displayName: displayName,
      translationDatasetMetadata: {
        sourceLanguageCode: "en",
        targetLanguageCode: "es",
      },
    },
  };

  // Create dataset
  const [operation] = await client.createDataset(request);

  // Wait for operation to complete.
  const [response] = await operation.promise();

  console.log(`Dataset name: ${response.name}`);
  console.log(`
    Dataset id: ${
      response.name
        .split("/")
        [response.name.split("/").length - 1].split("\n")[0]
    }`);
}

createDataset();
