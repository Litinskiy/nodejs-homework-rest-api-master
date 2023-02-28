const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
} = require("../services/contacts");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.set("Content-Type", "application/json").send(contacts);
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contact = await getContactById(id);

    if (!contact) {
      res.status(404).json({message: "Not found"}).end();
      return;
    }
    res.json(contact);
  } catch(error){
    next(error);
  }
};

const createContact = async (req, res, next)=>{
  
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch(error){
    next(error);
  }
};

const updateContactById = async (req, res, next)=>{
  const id = req.params.contactId;
  const contactChanges = req.body;
  
  try {
    const updatedContact = await updateContact(id, contactChanges);

    updatedContact
    ? res.status(200).json(updateContact)
    : res.status(404).json({message: "Not found"});
  } catch(error){
    next(error);
  }
}

const deleteContactById = async (req, res, next)=>{
  const id = req.params.contactId;
  
  try {
    const isContactExist = await removeContact(id);

    isContactExist
    ? res.status(200).json({message: "Contact deleted"})
    : res.status(404).json({message: "Not found"});
  } catch(error){
    next(error);
  }
}

const setFavorite = async (req, res, next)=>{
  const id = req.params.contactId;
  const favStatus = req.body;
  
  try {
    const updatedContact = await updateFavoriteStatus(id, favStatus);

    updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({message: "Not found"});
  } catch(error){
    next(error);
  }
}

module.exports = {
  getContacts,
  getById,
  createContact,
  updateContactById,
  deleteContactById,
  setFavorite,
};
