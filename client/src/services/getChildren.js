const getChildren = async (setChildren) => {
  try {
    const response = await fetch("/api/v1/children")
    const parsedData = await response.json()
    setChildren(parsedData.children)
  } catch(error) {
    console.log(`Error in fetching children:\n`, error.message)
  }
}

export default getChildren