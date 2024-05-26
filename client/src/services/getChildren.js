const getChildren = async () => {
  try {
    const response = await fetch("/api/v1/children")
    const parsedData = await response.json()
    return parsedData.children
  } catch (error) {
    console.log(`Error in fetching children:\n`, error.message)
  }
}

export default getChildren
