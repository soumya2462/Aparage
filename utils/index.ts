export const getMinsDifference = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return (end.getTime() - start.getTime()) / 1000 / 60;
};
