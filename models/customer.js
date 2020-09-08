const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255, minlength: 3 },
  phone: { type: Number, required: true, maxlength: 15, minlength: 8 },
  isGold: { type: Boolean, default: false },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    phone: Joi.string().min(8).max(15).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

exports.validate = validateCustomer;
exports.Customer = Customer;
