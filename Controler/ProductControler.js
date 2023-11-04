const Product = require("../Models/ProductModel");
const ErrorHander = require("../Utils/ErrorHander");
const AsyncError = require("../Middleware/catchAsyncError");
const ApiFeatures = require("../Utils/ApiFeatures");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dcks7kfdx",
  api_key: "963657813527249",
  api_secret: "ljpCJa8POFeFqj8lJoaR1IHivkI",
});

// Get All Product
exports.getAllProducts = AsyncError(async (req, res) => {
  const productsCount = await Product.countDocuments();
  const { category, name } = req.query;
  let queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (category) {
    queryObject.category = category;
  }
  let product = await Product.find(queryObject);
  res.status(200).json({
    success: true,
    product,
    productsCount,
  });
});

exports.adminProducts = AsyncError(async (req, res) => {
  const CountProduct = await Product.countDocuments();

  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
    CountProduct,
  });
});
//Create Product
exports.createProduct = AsyncError(async (req, res) => {
  let image = "";
  if (req.files) {
    const file = req.files.file;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      upload_preset: "DEV",
    });
    image = result.url;
  }
  const { name, price, weight, stock, category, description } = req.body;
  const product = await Product.create({
    name,
    price,
    stock,
    category,
    description,
    image,
    weight,
  });

  res.status(201).json({
    success: true,
    product,
  });
});
// Update Product
exports.updateProduct = AsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander(404, "Product not found"));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = AsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander(404, "Product not found"));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});

//getProductDetais
exports.getProductDetais = AsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
