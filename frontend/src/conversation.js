const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const assistant = new AssistantV2({
  version: "2020-05-02",
  authenticator: new IamAuthenticator({
    apikey: "uvYtYWHbtU74fAHZfl3gxdiKnKYNmivqYyFZ6NmUKQsV",
  }),
  url:
    "https://api.us-east.assistant.watson.cloud.ibm.com/instances/006bcf19-fd0b-4336-8a20-79355362fa75/v2/assistants/afe53514-c581-4581-bab0-19914eb1c266/sessions",
});

assistant
  .createSession({
    assistantId: "afe53514-c581-4581-bab0-19914eb1c266",
  })
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.log(err);
  });
