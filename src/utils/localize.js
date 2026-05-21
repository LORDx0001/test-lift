export const getLocalized = (obj, field, lang) => {
  if (!obj) return '';
  return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || obj[field] || '';
};
