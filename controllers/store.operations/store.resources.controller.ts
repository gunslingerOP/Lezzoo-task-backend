import { PrismaClient } from "@prisma/client";
import { validate } from "validate.js";
import { errRes, okRes } from "../../utility/helpers";

const prisma = new PrismaClient();

export default class StoreResources {
  static addStoreImage = async (req, res) => {
    let user = req.user;
    let storeId = parseInt(req.params.id);

    //check the image in request

    let image = req.files.Image;

    if (!image) return errRes(res, `Image cannot be empty`);

    let store = await prisma.store.updateMany({
      where: {
        id: storeId,
        user_id: user.id,
      },
      data: {
        image,
      },
    });

    if (!store) return errRes(res, `No store found with that ID`);
    return okRes(res, store);
  };

  static addCategoryImage = async (req, res) => {
    let user = req.user;
    let categoryId = parseInt(req.params.id);

    //check the image in request

    let image = req.files.Image;

    if (!image) return errRes(res, `Image cannot be empty`);

    //check if the store and category exist and belong to user
    let store = await prisma.store.findFirst({
      where: {
        user_id: user.id,
      },
    });
    if (!store) return errRes(res, `No category found`);
    let category = await prisma.category.updateMany({
      where: {
        id: categoryId,
        store_id: store.id,
      },
      data: {
        image,
      },
    });

    if (!category) return errRes(res, `No category found with that ID`);
    return okRes(res, category);
  };

  static addProductImage = async (req, res) => {
    let user = req.user;
    let productId = parseInt(req.params.id);

    //check the image in request

    let image = req.files.Image;

    if (!image) return errRes(res, `Image cannot be empty`);

    //check if the store and product exist and belong to user
    let store = await prisma.store.findFirst({
      where: {
        user_id: user.id,
      },
    });
    if (!store) return errRes(res, `Invalid product ID`);
    let product = await prisma.product.updateMany({
      where: {
        id: productId,
        store_id: store.id,
      },
      data: {
        image,
      },
    });

    if (!product) return errRes(res, `No product found with that ID`);
    return okRes(res, product);
  };
}
