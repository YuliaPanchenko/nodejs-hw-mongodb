import { ContactsCollection } from '../../src/db/models/contacts.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = {};

  if (filter.contactType) {
    query.contactType = filter.contactType;
  }

  const contactsQuery = ContactsCollection.find(query);
  const contactsCount = await ContactsCollection.find(query)
    .merge(contactsQuery)
    .countDocuments();

  const students = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: students,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const newContact = await ContactsCollection.create(payload);
  return newContact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const editContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
    },
  );
  return contact;
};
