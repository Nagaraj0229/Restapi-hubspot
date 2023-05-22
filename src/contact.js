const { 
    getContactList, 
    createContact,
    updateContact,
    deleteContact,
    deleteBatchContact,
    updateBatchContact,
    creatBatch,
    readBatchContact
    } = require('./service/hubspot/hubspot')

module.exports.contacts = async () => {
    console.log('contacts');
    try {
        const contacts = await getContactList();
        const formattedContacts = contacts.map(v => { return { id: v.id, 
            "createdate": v.properties.createdate,
            "email": v.properties.email,
            "firstname": v.properties.firstname,
            "hs_object_id": v.properties.hs_object_id,
            "lastmodifieddate": v.properties.lastmodifieddate,
            "lastname": v.properties.lastname
         } });
        return formattedContacts;
    } catch (e) { console.log(e); throw new Error(e) }
}



module.exports.createContact = async (contact) => {
    console.log('createContact');
    try {
      const newContact = await createContact(contact);
      return newContact;
    } catch (e) { console.log(e.message); throw new Error(e.message); }
  };
module.exports.updateContacts = async (id, data) => {
    console.log('updatecontacts');
    try {
        const contacts = await updateContact(id, data);
        return contacts;
    } catch (e) { console.log(e); throw new Error(e) }
}

module.exports.deleteContacts = async (id) => {
    console.log('deleteContact');
    try {
        const response = await deleteContact(id);
        return response;
    } catch (e) {
         console.log(e); throw new Error(e) 
        }
}


module.exports.deleteBatchContacts = async (data) => {
    console.log('deleteBatchContacts');
    try {
        const response = await deleteBatchContact(data.ids);
        return response;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

module.exports.updateBatchContacts = async (data) => {
    console.log('updateBatchContacts');
    try {
        const updateProp = data.contacts.map(v => {
            const name = v?.name?.split(" ");
            return {
                "id": v.id,
                firstname: name[0],
                lastname: name[1],
                email: v.email
            }
        })
        const response = await updateBatchContact(updateProp);
        return response;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

module.exports.createBatchContacts = async (data) => {
    console.log('createBatchContact');
    try {
        const response = await creatBatch(data.contacts);
        return response;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
} 

module.exports.readContacts = async (payload) => {
    console.log('readContacts');
    try {
      payload.ids = payload?.ids.split(',');
      const response = await readBatchContact(payload?.ids);
      return response;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }