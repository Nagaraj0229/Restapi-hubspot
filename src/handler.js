const {
  contacts,
  updateContacts,
  createContact,
  deleteContacts,
  deleteBatchContacts,
  updateBatchContacts,
  createBatchContacts,
  readContacts,
  searchContacts
} = require('./contact');
const { sendResponse, sendErrorResponse } = require('./utils/response.utils');

module.exports.getContactList = async () => {
  console.log('getContactList');
  try {
    const contactsList = await contacts();
    return sendResponse(contactsList);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.updateContact = async event => {
  console.log('updateContact');
  const data = JSON.parse(event.body);
  try {
    const contact = await updateContacts(event.pathParameters.id, data);
    return sendResponse(contact);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.createContact = async event => {
  console.log('createContact');
  const data = JSON.parse(event.body);
  try {
    const newContact = await createContact(data);
    return sendResponse(newContact);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.deleteContact = async event => {
  console.log('deleteContact');
  try {
    const response = await deleteContacts(event.pathParameters.id);
    return sendResponse(response);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.deleteBatchContact = async event => {
  console.log('deleteBatchContact');
  try {
    const data = JSON.parse(event.body);
    const response = await deleteBatchContacts(data);

    return sendResponse(response);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.updateBatchContactHandler = async event => {
  console.log('updateBatchContactHandler');
  try {
    const data = JSON.parse(event.body);
    const response = await updateBatchContacts(data);
    return sendResponse(response);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.createBatchContactHandler = async event => {
  console.log('createBatchContactHandler');
  const data = JSON.parse(event.body);
  try {
    const response = await createBatchContacts(data);
    return sendResponse(response);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.readBatchContactHandler = async event => {
  console.log('readBatchContactHandler');
  const data = event?.queryStringParameters;
  try {
    const response = await readContacts(data);
    return sendResponse(response);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};

module.exports.searchContactHandler = async event => {
  console.log('searchContactHandler');
  try {
    const query = event.queryStringParameters.q;
    const contacts = await searchContacts(query);

    return sendResponse(contacts);
  } catch (e) {
    console.log(e.message);
    return sendErrorResponse(e.message);
  }
};
