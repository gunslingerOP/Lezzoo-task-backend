import { PrismaClient } from "@prisma/client";
import { async } from "validate.js";
import { errRes, okRes } from "../../utility/helpers";
let prisma = new PrismaClient();
export default class DataController {
  static getUserInfo = async (req, res) => {
    let user = req.user;

    let details = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!details) return errRes(res, `No user found`);

    return okRes(res, details);
  };

  static getUserStores = async (req, res) => {
    let user = req.user;

    let stores = await prisma.store.findMany({
      where: {
        user_id: user.id,
      },
    });
    if (!stores) return errRes(res, `No store found`);

    return okRes(res, stores);
  };

  static getStoreCategories = async (req, res) => {
    let user = req.user;
    let storeId = parseInt(req.params.id);
    let store = await prisma.store.findFirst({
      where: {
        id: storeId,
        user_id: user.id,
      },
    });
    if (!store) return errRes(res, `No store found`);
    let categories = await prisma.category.findMany({
      where: {
        store_id: store.id,
      },
    });
    if (!categories) return errRes(res, `No categories found`);

    return okRes(res, categories);
  };

  static getCategoryProducts = async (req, res) => {
    let user = req.user;
    let categoryId = parseInt(req.params.id);
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
    if (!store) return errRes(res, `No store found`);

    let products = await prisma.product.findMany({
      where: {
        category_id: categoryId,
      },
    });
    if (!products) return errRes(res, `No products found`);

    return okRes(res, products);
  };

  static getStoreProducts = async (req, res) => {
    let user = req.user;
    let categoryId = parseInt(req.params.id);
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
    if (!store) return errRes(res, `No store found`);

    let products = await prisma.product.findMany({
      where: {
        store_id: store.id,
      },
    });
    if (!products) return errRes(res, `No products found`);

    return okRes(res, products);
  };

  static getProductDetails = async (req, res) => {
    let user = req.user;
    let productId = parseInt(req.params.id);
    let product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!product) return errRes(res, `No product found`);
    let store = await prisma.store.findFirst({
      where: {
        id: product.store_id,
        user_id: user.id,
      },
    });
    if (!store) return errRes(res, `No store found`);

    return okRes(res, product);
  };
}
