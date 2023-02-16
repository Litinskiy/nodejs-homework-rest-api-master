const express = require("express");
const Joi = require("joi");
const {
    register,
    login,
    logout,
    getCurrentUser,
    updateSubscription,
} = require("../../controllers/authController");

const { authMiddleware } = require("../../middlwares/authMiddlware");

const registerAndLoginSchema = Joi.object({
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  password: Joi.string().required().min(4),
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }
  return next();
};

const router = express.Router();

router.post("/register", validator(registerAndLoginSchema), register);
router.post("/login", validator(registerAndLoginSchema), login);
router.get("/logout", authMiddleware, logout);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/subscription", authMiddleware, updateSubscription);

module.exports = router;