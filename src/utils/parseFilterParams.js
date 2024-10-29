// const parseFilterValue = (value) => {
//   const allowedContactTypes = ['work', 'home', 'personal'];

//   if (typeof value === 'string' && allowedContactTypes.includes(value)) {
//     return value;
//   }

//   return undefined;
// };

// export const parseFilterParams = (query) => {
//   const { contactType } = query;

//   const parsedContactType = parseFilterValue(contactType);

//   return {
//     contactType: parsedContactType,
//   };
// };

const parseFilterValue = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { contactType } = query;

  const parsedContactType = parseFilterValue(contactType);
  return {
    contactType: parsedContactType,
  };
};
