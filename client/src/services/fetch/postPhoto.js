const postPhoto = async (apiURL, newPhotoBody) => {
  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      Accept: "image/jpeg",
    },
    body: newPhotoBody,
  })
  return response
}

export default postPhoto