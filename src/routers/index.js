const { Router } = require("express");

const masterRouter = Router();

const userRouter = require("./user.router");
const productRouter = require("./product.router");

masterRouter.use("/user", userRouter);
masterRouter.use("/products", productRouter);

module.exports = masterRouter;
