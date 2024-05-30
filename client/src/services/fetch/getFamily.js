const getFamily = async () => {
  try {
    const response = await fetch("/api/v1/family")
    const parsedData = await response.json()
    return parsedData.family
  } catch (error) {
    console.log(`Error in fetching family:\n`, error.message)
  }
}

export default getFamily