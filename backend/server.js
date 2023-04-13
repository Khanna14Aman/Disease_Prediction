const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config("./env");
const router = require("./routes/useroutes");
const PORT = process.env.PORT;
const cors = require("cors");
const { errorHandler, notFound } = require("./middleware/errormiddleware");
require("./database/connection");
app.use(express.json());
app.use("/user", router);
app.use(cors());
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
