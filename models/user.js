const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50, minlength: 3 },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  password: { type: String, minlength: 6, maxlength: 1024, required: true },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;
