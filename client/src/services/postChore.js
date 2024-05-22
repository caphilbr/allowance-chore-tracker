import translateServerErrors from "./translateServerErrors"

const postChore = async (payload) => {
  try {
    const response = await fetch("/api/v1/chore", {
      method: "POST",
      headers: new Headers ({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(payload)
    })
    if (!response.ok) {
      if (response.status === 422) {
        const errorBody = await response.json()
        const newErrors = translateServerErrors(errorBody.errors)
        return {ok: false, status: 422, error: newErrors}
      } else {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
    } else {
      const parsedData = await response.json()
      return {ok: true, status: 200, body: parsedData.chore}
    }
  } catch (error) {
    console.error(`Error in fetch patch: ${error.message}`)
    return {ok: false, status: 500, error: error}
  }
}

export default postChore