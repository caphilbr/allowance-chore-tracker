const getQuizQuestion = async () => {
  try {
    const response = await fetch("/api/v1/quiz")
    const parsedData = await response.json()
    return { ok: true, status: 200, body: parsedData.question }
  } catch(error) {
    console.log('error in quiz fetch: ', error.message)
    return { ok: false, status: 500, statusText: error.message }
  }
}

export default getQuizQuestion