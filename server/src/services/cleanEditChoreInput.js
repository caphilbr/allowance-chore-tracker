import currency from "currency.js"

const cleanEditChoreInput = (inputObject) => {
  const cleanInput = {}
  Object.keys(inputObject).forEach(key => {
    if (key == "amount") {
      cleanInput[key] = currency(inputObject[key])
    }
    else if (key == "dueDate") {
      if (inputObject[key] == "") {
        const today = new Date()
        const oneYearFromToday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
        cleanInput[key] = oneYearFromToday
      } else {
        cleanInput[key] = new Date(inputObject[key])
      }
    }
    else {
      cleanInput[key] = inputObject[key]
    }
  })
  return cleanInput
}

export default cleanEditChoreInput