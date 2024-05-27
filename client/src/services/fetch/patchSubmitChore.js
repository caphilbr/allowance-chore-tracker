const patchSubmitChore = async (choreId) => {
  try {
    const response = await fetch(`/api/v1/chore/submit/${choreId}`, {
      method: "PATCH",
    })
    const parsedData = await response.json()
    return {ok: true, chore: parsedData.chore}
  } catch(error) {
    console.log('Error in submitting chore: ', error.message)
    return {ok: false, error: error}
  }
}

export default patchSubmitChore