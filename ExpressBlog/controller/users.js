const User = require("../models/User");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching users", error });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the user", error });
  }
};

// Create a new user
const createUser = async (req, res) => {
  const body = req.body;
  try {
    const newUser = await User.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while creating the user", error });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update(body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "An error occurred while updating the user", error });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the user", error });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };