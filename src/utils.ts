/**
 *
 * @param dateString a valid Date() string
 * @returns a properly formatted date string
 */
export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();
