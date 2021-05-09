const router = require("express").Router();
const { Category, Product } = require("../../models");
// The `/api/categories` endpoint
// GET all products
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      // Add Product as a second model to JOIN with
      include: [Category],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET a single product`
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      // Add Product as a second model to JOIN with
      include: [Category],
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// CREATE a product
router.post("/", async (req, res) => {
  try {
    const productData = await Product.create(req.body);
    if (productData.id && req.body.tagIds.length > 0){
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
   
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});
// UPDATE a product
router.put("/:id", async (req, res) => {
 
  try {
    const productData = await Product.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
 
 
 

// DELETE a product
router.delete("/:id", async (req, res) => { 
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

