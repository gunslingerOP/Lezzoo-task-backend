import * as validate from "validate.js";
import * as jwt from "jsonwebtoken";
import validator from "../../utility/validation";
import {
  comparePassword,
  errRes,
  hashMyPassword,
  okRes,
} from "../../utility/helpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserController {
  /**
   *
   * This function adds a todo
   *
   * @requires unique_username
   *
   * @requires password
   *
   * @returns the created user
   */

  static register = async (req, res) => {
    //Check the req data validity
    let body = req.body;
    let notValid = validate(body, validator.register());

    if (notValid) return errRes(res, notValid);

    //check if user exists
    let userExists = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (userExists) return errRes(res, `${body.username} is taken`);

    //Encrypting password and adding user to db

    let password = await hashMyPassword(body.password);

    let user = await prisma.user.create({
      data: {
        username: body.username,
        password,
      },
    });
    user.password = null;

    //creating a user token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return okRes(res, { user, token });
  };

  /**
   * This function allows the user to login
   */

  static login = async (req, res) => {
    let body = req.body;
    let notValid = validate(body, validator.login());

    if (notValid) return errRes(res, notValid);
    //check if username and password are correct
    let userExists = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });
    if (!userExists) return errRes(res, `Username does not exist`);

    let passwordIsCorrect = await comparePassword(
      body.password,
      userExists.password
    );

    if (!passwordIsCorrect) return errRes(res, `Incorrect password`);

    //return a token if all is good
    const token = jwt.sign({ id: userExists.id }, process.env.JWT_SECRET);

    return okRes(res, { userExists, token });
  };
}
