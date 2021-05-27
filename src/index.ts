import express = require("express");
import * as cors from "cors";
import userV1 from "../routes/User /v1";
import storeV1 from "../routes/store/v1";
import storeResources from "../routes/resources/v1";
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
app.use("/v1/store", storeV1);
app.use("/v1/image", storeResources);
// app.use("/v1/data", dataV1);

app.use("/", function (req, res) {
  res.statusCode = 404; //send the appropriate status code
  return res.json({
    status: false,
    message: "404 Not Found",
    data: {},
  });
});
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
