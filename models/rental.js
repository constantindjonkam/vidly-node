const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, maxlength: 255, minlength: 5 },
      phone: { type: String, required: true, maxlength: 15, minlength: 8 },
      isGold: { type: Boolean, default: false },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        require: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: { type: Number, min: 0, max: 255, required: true },
    }),
    required: true,
  },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(rental);
}

exports.validate = validateRental;
exports.Rental = Rental;
