const Tag = require("../models/Tag");

// Get all tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching tags", error });
  }
};

// Get a single tag by ID
const getTagById = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the tag", error });
  }
};

// Create a new tag
const createTag = async (req, res) => {
  const body = req.body;
  try {
    const newTag = await Tag.create(body);
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while creating the tag", error });
  }
};

// Update a tag by ID
const updateTag = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });

    await tag.update(body);
    res.status(200).json(tag);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while updating the tag", error });
  }
};

// Delete a tag by ID
const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });

    await tag.destroy();
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the tag", error });
  }
};

module.exports = { getAllTags, getTagById, createTag, updateTag, deleteTag };