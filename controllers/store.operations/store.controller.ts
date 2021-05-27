import * as validate from "validate.js";
import validator from "../../utility/validation";
import { errRes, okRes } from "../../utility/helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class StoreController {
  /**
   *
   * This function adds a store
   *
   * @requires title
   * @requires description
   * @requires image
   *
   * @returns the created store
   */

  static addStore = async (req, res) => {
    //Getting user and request body
    let user = req.user;
    let user_id = user.id;
    let body = req.body;

    //Validating request data
    let notValid = validate(body, validator.store());
    if (notValid) return errRes(res, notValid);

    //Add store
    let store = await prisma.store.create({
      data: {
        title: body.title,
        description: body.description,
        user_id,
      },
    });
    return okRes(res, store);
  };

  /**
   *
   * This function adds a category
   *
   * @requires store's ID
   *
   *
   */

  static addCategory = async (req, res) => {
    let user = req.user;
    let store_id = parseInt(req.params.storeId);
    let body = req.body;
    //Validating request data
    let notValid = validate(body, validator.category());
    if (notValid) return errRes(res, notValid);

    //check if store exists and belongs to user

    let store = await prisma.store.findFirst({
      where: {
        id: store_id,
        user_id: user.id,
      },
    });

    if (!store) return errRes(res, `No store found!`);

    let category = await prisma.category.create({
      data: {
        store_id,
        name: body.name,
        description: body.description,
      },
    });

    return okRes(res, category);
  };

  /**
   *
   * This function adds a product
   *
   * @requires categoryId
   *
   * @returns the created product
   */

  static addProduct = async (req, res) => {
    let user = req.user;
    let body = req.body;
    let categoryId = parseInt(req.params.categoryId);
    //Validating request data
    let notValid = validate(body, validator.product());
    if (notValid) return errRes(res, notValid);

    //check if category and store exist and belong to user
    let category = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    if (!category) return errRes(res, `No category found`);

    let store = await prisma.store.findFirst({
      where: {
        id: category.store_id,
        user_id: user.id,
      },
    });
    if (!store) return errRes(res, `You have no stores with such a category!`);

    //add the product
    let product = await prisma.product.create({
      data: {
        store_id: store.id,
        category_id: category.id,
        name: body.name,
        description: body.description,
      },
    });
  };

  /**
   * This function adds an image to a store, category or product
   *
   * @requires ID of the entity you wish to add an image to
   * @requires entityType : as query this is the type of entity you wish to add an image to (store for example)
   */
}
