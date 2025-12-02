const Category = require("../models/Category");

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error getting categories", error });
  }
};

// get Categories by ID
exports.getCategoriesByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//post
exports.createCategories = async (req, res) => {
  try {
    const { categoryName, description, status } = req.body;
    const categories = await Category.create({
      categoryName,
      description,
      status,
    });

    res.status(201).json({
      message: "Category created successfully",
      categories,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update Categories
exports.updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, description, status } = req.body;

    // Find category by ID and update
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, description, status },
      { new: true, runValidators: true } // returns the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error updating category", error: err.message });
  }
};

//delete category
exports.deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
