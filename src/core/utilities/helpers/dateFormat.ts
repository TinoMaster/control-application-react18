export const dateFormat = (dateStr: string) => {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateToString = (dateToFormat: Date) => {
  const date = new Date(dateToFormat);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatDateToHourString = (dateToFormat: Date) => {
  const date = new Date(dateToFormat);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${formatMinutes(minutes)}`;
};

function formatMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : minutes;
}
