import { PrismaClient } from "@prisma/client";
import { validate } from "validate.js";
import { errRes, okRes } from "../../utility/helpers";

const prisma = new PrismaClient();

export default class StoreResources {
  static addStoreImage = async (req, res) => {
    let user = req.user;
    let storeId = parseInt(req.params.id);

    //check the image in request
    if (!req.files) return errRes(res, `Upload an image`);

    let imageBuffer = req.files.Image.data;

    if (!imageBuffer)
      return errRes(res, `Make sure the field named "Image" is not empty`);

    let store = await prisma.store.updateMany({
      where: {
        id: storeId,
        user_id: user.id,
      },
      data: {
        image: imageBuffer,
      },
    });

    if (!store) return errRes(res, `No store found with that ID`);
    return okRes(res, `Image added`);
  };

  static addCategoryImage = async (req, res) => {
    let user = req.user;
    let categoryId = parseInt(req.params.id);

    //check the image in request
    if (!req.files || !req.files.Image)
      return errRes(
        res,
        `Upload an image or Make sure the field named "Image" is not empty`
      );
    let imageBuffer = req.files.Image.data;

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
        image: imageBuffer,
      },
    });

    if (!category) return errRes(res, `No category found with that ID`);
    return okRes(res, `Image added`);
  };

  static addProductImage = async (req, res) => {
    let user = req.user;
    let productId = parseInt(req.params.id);

    //check the image in request
    if (!req.files || !req.files.Image) return errRes(res, `Upload an image`);

    let imageBuffer = req.files.Image.data;

    if (!imageBuffer)
      return errRes(res, `Make sure the field named "Image" is not empty`);

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
        image: imageBuffer,
      },
    });

    if (!product) return errRes(res, `No product found with that ID`);
    return okRes(res, `Image added`);
  };
}
