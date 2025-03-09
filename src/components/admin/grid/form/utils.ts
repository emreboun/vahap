export const validateDate = (dateString: string | null): boolean => {
  if (!dateString) return false;

  const inputDate = new Date(dateString);
  const now = new Date();

  if (inputDate < now) return false;

  return true; // Valid
};
