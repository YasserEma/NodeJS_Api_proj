const asyncWrapper = require("../middleware/asyncWrapper");
const User = require('../models/user.model');
const httpStatusText = require('../utils/httpStatusText');
const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req,res) => {

    const query = req.query;

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    // get all courses) from DB using Course Model
    const users = await User.find({}, {"__v": false, 'password': false}).limit(limit).skip(skip);

    res.json({ status: httpStatusText.SUCCESS, data: {users}});
})


const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, Email, password, role } = req.body;
    console.log(firstName, lastName, Email, password, role);
    res.json( Email);
    const oldUser = await User.findOne({ Email: Email});
    //res.json(oldUser)

    if(oldUser) {
        const error = appError.create('user already exists', 400, httpStatusText.FAIL)
        return next(error);
    }

    // password hashing
    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
        firstName,
        lastName,
        Email,
        password: hashedPassword,
        role,
        avatar: req.file.filename
    })

    // generate JWT token 
    const token = await generateJWT({Email: newUser.Email, id: newUser._id, role: newUser.role});
    newUser.token = token;


    await newUser.save();



    res.status(201).json({status: httpStatusText.SUCCESS, data: {user: newUser}})


})


const login = asyncWrapper(async (req, res, next) => {
    const {Email, password} = req.body;

    if(!Email && !password) {
        const error = appError.create('Email and password are required', 400, httpStatusText.FAIL)
        return next(error);
    }

    const user = await User.findOne({Email: Email});

    if(!user) {
        const error = appError.create('user not found', 400, httpStatusText.FAIL)
        return next(error);
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if(user && matchedPassword) {
        // logged in successfully

       const token = await generateJWT({Email: user.Email, id: user._id, role: user.role});

        return res.json({ status: httpStatusText.SUCCESS, data: {token}});
    } else {
        const error = appError.create('something wrong', 500, httpStatusText.ERROR)
        return next(error);
    }

})


module.exports = {
    getAllUsers,
    register,
    login
}