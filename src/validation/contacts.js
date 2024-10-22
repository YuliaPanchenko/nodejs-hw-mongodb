import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
