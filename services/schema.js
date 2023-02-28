const Joi = require("joi");

const registerAndLoginSchema = Joi.object({
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  password: Joi.string().required().min(4),
});

module.exports = { registerAndLoginSchema };