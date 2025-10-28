import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  discription: {
    type: String,
  },
  qa: [
    {
      question: { type: String, required: true },
      answer: { type: mongoose.Schema.Types.Mixed }
    }
  ],
  reportUrl: {
    type: String,
  },
  transparencyScore: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const ProductModel = mongoose.model("productschema", productSchema);
export default ProductModel;
