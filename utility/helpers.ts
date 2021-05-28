import * as bcrypt from "bcrypt";
import { v1 as uuidv1 } from "uuid";
import * as fs from "fs";
const path = require("path");

const errRes = (res, err, statusCode = 400) => {
  let response = { status: false, err };
  res.statusCode = statusCode;
  return res.json(response);
};

const okRes = (res, data, statusCode = 200) => {
  let response = { status: true, data };
  res.statusCode = statusCode;
  return res.json(response);
};

const hashMyPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainPassword, salt);
  return password;
};

const comparePassword = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash);

const paginate = (p = 1, s = 10) => {
  let take = Number(s);
  let skip = s * (p - 1);
  return { take, skip };
};

export { okRes, errRes, hashMyPassword, comparePassword, paginate };
