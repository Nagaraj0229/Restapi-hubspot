const hubspot = require('@hubspot/api-client');
const omit = require('lodash.omit');

const hubspotClient = new hubspot.Client({ "accessToken": "pat-na1-3992ad53-034c-493e-b894-8152c8766fb8" });

async function getContactList() {
  const limit = 10;
  let after = undefined;
  const properties = ['email', 'firstName', 'lastName'];
  let contacts = [];
  try {
    do {
      const apiResponse = await hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties);
      contacts.push(...apiResponse.results)
      after = apiResponse?.paging?.neaxt?.after;
    } while (after);
    return contacts;
  }
  catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}


// create //

async function createContact(properties) {

  const SimplePublicObjectInputForCreate = { properties };
  console.log(SimplePublicObjectInputForCreate.properties)
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInputForCreate);
    console.log(JSON.stringify(apiResponse, null, 2));
    return apiResponse;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

async function readHubspotContact(contactId) {
  const properties = ["firstName", "lastName", "company"];

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(contactId.id, properties);
    console.log(JSON.stringify(apiResponse, null, 2));
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

async function updateContact(contactId, properties) {
  const SimplePublicObjectInput = { properties };
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.update(contactId, SimplePublicObjectInput);
    console.log(JSON.stringify(apiResponse, null, 2));
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

async function deleteContact(contactId) {
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.archive(contactId);
    console.log(JSON.stringify(apiResponse, null, 2));
    return;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}
async function deleteBatchContact(ids) {
  try {
    const contactIds = { inputs: ids.map(v => { return { id: v } }) }
    const apiResponse = await hubspotClient.crm.contacts.batchApi.archive(contactIds);
    console.log(JSON.stringify(apiResponse, null, 2));
    return;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
    throw e;
  }
}

async function creatBatch(contacts) {

  const BatchInputSimplePublicObjectInputForCreate = {
    inputs: contacts.map(v => { return { properties: v } })
  }
  try {
    const apiResponse = await hubspotClient.crm.contacts.batchApi.create(BatchInputSimplePublicObjectInputForCreate);
    return apiResponse;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

async function readBatchContact(contactIds = []) {
  console.log(contactIds);
  const BatchReadInputSimplePublicObjectId = {
    properties: ["email"],
    inputs: contactIds.map(v => ({ id: v }))
  }
  const archived = false;
  try {
    const apiResponse = await hubspotClient.crm.contacts.batchApi.read(BatchReadInputSimplePublicObjectId, archived);
    return apiResponse;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

async function updateBatchContact(update) {
  const BatchInputSimplePublicObjectBatchInput = {
    inputs: update.map(v => { return { id: v.id, properties: omit(v, "id") } })
  }
  try {
    const apiResponse = await hubspotClient.crm.contacts.batchApi.update(BatchInputSimplePublicObjectBatchInput);
    return apiResponse;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}
// eslint-disable-next-line no-unused-vars
async function searchContact(_payload) {
  const PublicObjectSearchRequest = {
    "filterGroups": [
      {
        "filters": [
          {
            "propertyName": "firstname",
            "operator": "EQ",
            "value": "Bryan"
          }
        ]
      }
    ]
  };

  try {
    const apiResponse = await hubspotClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
    console.log(JSON.stringify(apiResponse, null, 2));
    return apiResponse;
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

module.exports = {
  getContactList,
  createContact,
  readHubspotContact,
  deleteContact,
  deleteBatchContact,
  creatBatch,
  readBatchContact,
  updateBatchContact,
  searchContact,
  updateContact
}