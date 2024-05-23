const getChild = async () => {
  try {
    const response = await fetch("/api/v1/users/child-version")
    const parsedData = await response.json()
    return parsedData.child
  } catch(error) {
    console.log(`Error in fetching children:\n`, error.message)
  }
}

export default getChild