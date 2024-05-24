const getChildRelations = async () => {
  try {
    const response = await fetch("/api/v1/children/child-relations")
    const parsedData = await response.json()
    return parsedData.childRelations
  } catch(error) {
    console.log(`Error in fetching children:\n`, error.message)
  }
}

export default getChildRelations