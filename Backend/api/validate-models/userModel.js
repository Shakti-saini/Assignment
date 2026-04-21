var joi = require("joi");

module.exports.signinUser = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
})







