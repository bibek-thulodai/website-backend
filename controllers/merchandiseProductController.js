const MerchandiseProduct = require("../models/MerchandiseProduct");

exports.createMerchandiseProduct = async (req, res) => {
  try {
    const { name, subtitle, code, description } = req.body;
    const image = req.file ? `/uploads/merchandiseProducts/${req.file.filename}` : null;

    const product = new MerchandiseProduct({ name, subtitle, code, description, image });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
};

exports.getAllMerchandiseProducts = async (req, res) => {
  try {
    const products = await MerchandiseProduct.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};

exports.updateMerchandiseProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subtitle, code, description } = req.body;

    const imageUrl = req.file ? `/uploads/merchandiseProducts/${req.file.filename}` : undefined;

    const updateFields = {
      ...(name && { name }),
      ...(subtitle && { subtitle }),
      ...(code && { code }),
      ...(description && { description }),
      ...(image && { image }),
    };

    const updatedProduct = await MerchandiseProduct.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};
