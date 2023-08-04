const productModel = require("../models/product.model");

const viewProducts = async (req, res) => {
  const { query } = req;
  try {
    const result = await productModel.getProduct(query);
    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  const { body, uploadResult } = req;
  try {
    await productModel.storingProduct(body, uploadResult);
    res.status(200).json({
      msg: "Add Product Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const viewProductDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productModel.getDetailProduct(id);
    res.status(200).json({
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { viewProducts, addProduct, viewProductDetail };
