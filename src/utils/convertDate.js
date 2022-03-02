const convertDate = (fullDate) => {
  const parsedDate = new Date(fullDate);
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
