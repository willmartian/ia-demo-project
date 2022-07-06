/**
 *
 * @param dateString a valid Date() string
 * @returns unified format for dates
 */
export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString();
