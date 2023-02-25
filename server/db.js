const mongoose = require("mongoose");

const dbConn = process.env.DB_URI;

mongoose
  .connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("[+] MongoDb is connected!");
  })
  .catch((e) => {
    console.log("[x] DB Connection Error!", e);
  });
