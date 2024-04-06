type DateUI = 'today' | 'yesterday' | 'tomorrow' | string;

export const formatDatesForUI = (date: Date): DateUI => {
  const currentDate = new Date();

  // Today logic
  if (isSameDay(currentDate, date)) return 'today';

  //  Yesterday  logic
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  if (isSameDay(yesterdayDate, date)) return 'yesterday';

  // Tomorrow logic
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  if (isSameDay(tomorrowDate, date)) return 'tomorrow'

  const finalDate = new Date(date);
  // Default date toDateString.
  return `${finalDate.getMonth()}/${finalDate.getDay()}/${finalDate.getFullYear()}`;
}


const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}
