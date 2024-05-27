const postUserSession = async (userPayload) => {
  const response = await fetch("/api/v1/user-sessions", {
    method: "POST",
    body: JSON.stringify(userPayload),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  return response
}

export default postUserSession