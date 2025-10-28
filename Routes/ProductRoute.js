import express from "express"
import ProductModel from "../model/ProductModel.js";

const router=express.Router();

router.post("/addproduct", async (req, res) => {
    try {  
      const { productName, category, description, qa } = req.body;
  
      if (!productName || !category) {
        return res.status(400).json({ success: false, message: "Product name and category are required" });
      }
  
      const newProduct = new ProductModel({
        productName,
        category,
        description,
        qa,
      });
  
      await newProduct.save();
  
      res.status(201).json({ success: true, product: newProduct });
    } catch (err) {
      console.error("Error saving product:", err);
      res.status(500).json({ success: false, message: "Failed to Add Product" });
    }
  });
  
// Get all products
router.get("/getproducts", async (req, res) => {
    try {
      const products = await ProductModel.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, products });
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
  });
  
  // Get single product by ID (for downloading report)
  router.get("/getproduct/:id", async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      res.status(200).json({ success: true, product });
    } catch (err) {
      console.error("Error fetching product:", err);
      res.status(500).json({ success: false, message: "Failed to fetch product" });
    }
  });

export default router;