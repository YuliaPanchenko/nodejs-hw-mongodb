const parseFilterValue = (value) => {
  const allowedContactTypes = ['work', 'home', 'personal'];

  if (typeof value === 'string' && allowedContactTypes.includes(value)) {
    return value;
  }

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType } = query;

  const parsedContactType = parseFilterValue(contactType);

  return {
    contactType: parsedContactType,
  };
};
