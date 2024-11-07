import {
  createContact,
  deleteContact,
  editContact,
  getAllContacts,
  getContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  // console.log(page, perPage);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user.id);

  if (contact === null) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact({
    ...req.body,
    userId: req.user.id,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: `Seccessfully created a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await deleteContact(id, req.user.id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await editContact(id, req.user.id, req.body, photoUrl);

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully edit a contact!',
    data: result,
  });
};
