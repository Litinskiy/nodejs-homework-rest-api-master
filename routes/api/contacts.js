const express = require('express');
const Joi = require("joi");
const {
  getContacts,
  getById,
  createContact,
  updateContactById,
  deleteContactById,
  setFavorite,
} = require("../../controllers/contactsController");
const { authMiddleware } = require("../../middlwares/authMiddlware");


const addContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  phone: Joi.string(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
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

router.get('/',
  authMiddleware,
  getContacts);

router.get('/:contactId',
  authMiddleware,
  getById);

router.post('/',
  validator(addContactSchema),
  authMiddleware,
  createContact);

router.delete('/:contactId',
  authMiddleware,
  deleteContactById);

router.put('/:contactId',
  authMiddleware,
  validator(updateContactSchema),
  updateContactById);

router.patch('/:contactId/favorite',
  authMiddleware,
  validator(updateFavoriteSchema),
  setFavorite);

module.exports = router;
