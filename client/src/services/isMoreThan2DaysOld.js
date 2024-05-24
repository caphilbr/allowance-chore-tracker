const isMoreThan2DaysOld = (date) => {
  const millisecondsIn48Hours = 48 * 60 * 60 * 1000
  const today = new Date()
  const differenceInMilliseconds = Math.abs(today.getTime() - date.getTime());
  return differenceInMilliseconds > millisecondsIn48Hours;
}

export default isMoreThan2DaysOld