const isDateInPast = (dateString) => {

  console.log(dateString)
  const dateObject = new Date(dateString);
  const userOffset = dateObject.getTimezoneOffset() / 60;
  dateObject.setHours(dateObject.getHours() + userOffset);

  const date = new Date(dateObject)
  const dateYear = date.getFullYear()
  const dateMonth = date.getMonth() + 1
  const dateDay = date.getDate()
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth() + 1
  const todayDay = today.getDate()

  if (dateYear < todayYear) {
    return true
  }
  if (dateYear == todayYear && dateMonth < todayMonth) {
    return true
  }
  if (dateYear == todayYear && dateMonth == todayMonth && dateDay < todayDay) {
    return true
  }
  return false
}

export default isDateInPast