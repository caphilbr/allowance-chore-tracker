const addMonths = (date, months) => {
  let newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

export default addMonths