const Category = require("../models/Category");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching categories", error });
  }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the category", error });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  const body = req.body;
  try {
    const newCategory = await Category.create(body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while creating the category", error });
  }
};

// Update a category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.update(body);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while updating the category", error });
  }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the category", error });
  }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };