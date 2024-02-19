export const timestamp = (val: number | string | null) => {
  if (!val) return null;
  const date = new Date(val);

  let month: string | number = date.getMonth() + 1;
  let day: string | number = date.getDate();
  const year: string | number = date.getFullYear();

  month < 10 ? (month = '0' + month) : '';
  day < 10 ? (day = '0' + day) : '';

  return `${year}/${month}/${day}`;
};
