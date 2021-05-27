import express = require("express");
import * as cors from "cors";
import userV1 from "../routes/User /v1";
// import todoV1 from "../routes/todo/v1";
// import dataV1 from "../routes/data/v1";

const formidableMiddleware = require("express-formidable");
let port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  formidableMiddleware({
    uploadDir: "/images",
    multiples: false,
  })
);
app.use("/v1/user", userV1);
// app.use("/v1", todoV1);
// app.use("/v1/data", dataV1);
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
