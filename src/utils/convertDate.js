const relativeTimeConverter = (timeVal) => {
  if (timeVal < 60) return `Just now`;
  if (timeVal < 3600)
    return `${Math.floor(timeVal / 60)} minute${Math.floor(timeVal / 60) > 1 ? 's' : ''} ago`;
  if (timeVal < 86400)
    return `${Math.floor(timeVal / 3600)} hour${Math.floor(timeVal / 3600) > 1 ? 's' : ''} ago`;
  return false;
};

const convertDate = (fullDate) => {
  const parsedDate = new Date(fullDate);
  const timeSincePostInSeconds = Math.floor((Date.now() - parsedDate) / 1000);

  const relativeTime = relativeTimeConverter(timeSincePostInSeconds);

  if (relativeTime) {
    return relativeTime;
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  return `${parsedDate.getDate()} ${
    monthNames[parsedDate.getMonth()]
  } ${parsedDate.getFullYear()} `;
};

export default convertDate;
