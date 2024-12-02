export function calculateDays(beginDate, endDate) {
  const formatDate = dateString => dateString.replace(/\./g, '-');

  const startDate = new Date(formatDate(beginDate));
  const finishDate = new Date(formatDate(endDate));

  if (isNaN(startDate) || isNaN(finishDate)) {
    console.error('날짜 계산 실패');
    return 0;
  }

  const differenceInTime = finishDate - startDate;
  const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  return differenceInDays + 1;
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}
