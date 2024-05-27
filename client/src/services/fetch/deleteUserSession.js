const deleteUserSession = async () => {
  try {
    const response = await fetch("/api/v1/user-sessions", {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
    if (response.ok) {
      return { ok: true }
    }
  } catch(error) {
    console.log('Error in deleting User Session: ', error.message)
    return { ok: false, error: error }
  } 
}

export default deleteUserSession