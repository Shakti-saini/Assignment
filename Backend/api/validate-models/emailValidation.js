const Joi = require("joi");

exports.emailSchema = Joi.object({
  to: Joi.string().required(),
  cc: Joi.string().optional().allow(""),
  bcc: Joi.string().optional().allow(""),
  subject: Joi.string().required(),
  body: Joi.string().required(),
});