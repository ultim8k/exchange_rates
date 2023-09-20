/**
 *
 * @param dateString
 * @returns a date in the format DD MMMM YYYY
 *
 * @example 01 January 1970
 *
 * Ideally we would use a library like date-fns or moment.js but for this test I wanted to go simple.
 *
 */
export const getDateAsDDMMMMYYYY = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
