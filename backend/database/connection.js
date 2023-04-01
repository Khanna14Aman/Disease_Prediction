const mongoose = require("mongoose");
mongoose
  .connect(process.env.URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
