const deleteAllowance = async (allowanceId) => {
  try {
    const response = await fetch(
      `/api/v1/allowance/${allowanceId}`,
      { method: "DELETE" }
    )
    if (response.ok) {
      return {ok: true, status: 200}
    } else {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
  } catch (error) {
    console.log("Error in the delete request: ", error.message)
    return {ok: false, status: 500, error: error}
  }
}

export default deleteAllowance