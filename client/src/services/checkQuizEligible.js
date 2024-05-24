const checkQuizEligible = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const diffInMs = today - date;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)
  if (diffInDays >= 7) {
    return true
  }
  return false
}

export default checkQuizEligible