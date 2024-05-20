const isDateInPast = (dateString) => {

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

  if (dateYear >= todayYear && dateMonth >= todayMonth && dateDay >= todayDay) {
    return false
  }
  return true
}

export default isDateInPast