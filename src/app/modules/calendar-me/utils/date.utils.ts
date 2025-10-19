export function fromCalendarDateNgPrimeToYYYYYMMDDString(date: any): string {
  let month = date.month + 1;
  if (month < 10) month = '0' + month;
  let day = date.day;
  if (day < 10) day = '0' + day;
  return `${date.year}-${month}-${day}`;
}

export function fromDateToYYYYMMDDString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}
