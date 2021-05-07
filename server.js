const app = require("./backend/app");
const config = require("./backend/config/index");

const { PORT } = config;


app
  .listen(PORT)
  .on("listening", () =>
    console.log(`Realtime server running on port ${PORT}`)
  );
