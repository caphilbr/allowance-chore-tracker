const deleteAllowance = async (allowanceId) => {
  try {
    const response = await fetch(`/api/v1/allowance/${allowanceId}`, {
      method: "DELETE",
    })
    if (response.ok) {
      return { ok: true }
    } else {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
  } catch (error) {
    console.log("Error in the delete request: ", error.message)
    return { ok: false, error: error }
  }
}

export default deleteAllowance
