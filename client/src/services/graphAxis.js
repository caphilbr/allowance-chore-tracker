const graphAxis = (earliestDate, smallestBalance, largestBalance) => {
  
  let yMin = 0
  if (smallestBalance < 0) {
    yMin = smallestBalance - 5
  }
  const yMax = largestBalance + 5

  const xMin = new Date(
    earliestDate.getFullYear(),
    earliestDate.getMonth() - 1,
    earliestDate.getDate()
  )
  const xMax = new Date()

  return { xMin, xMax, yMin, yMax }
}

export default graphAxis