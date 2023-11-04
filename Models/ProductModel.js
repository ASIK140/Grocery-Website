const mongo = require("mongoose");

const productSchema = new mongo.Schema({
  name: {
    type: String,
    required: [true, "Etner product name"],
  },
  description: {
    type: String,
    required: [true, "Etner product Description"],
  },
  price: {
    type: Number,
    required: [true, "Etner product price"],
    maxLength: 6,
  },
  weight: {
    type: Number,
    required: [true, "Etner product weigth"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Enter product category"],
  },
  stock: {
    type: Number,
    maxLength: 4,
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 1,
  },
  review: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongo.model("Product", productSchema);
