const createCode = () => {
  let codeString = ""
  for (let i = 1; i <= 4; i++) {
    codeString += Math.floor(10 * Math.random())
  }
  return codeString
}

export default createCode
