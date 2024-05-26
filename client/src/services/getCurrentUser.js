import refreshAllowancePayments from "./refreshAllowancePayments"

const getCurrentUser = async () => {
  const response = await fetch("/api/v1/user-sessions/current", {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  if (!response.ok) {
    const errorMessage = `${response.status} (${response.statusText})`
    const error = new Error(errorMessage)
    throw error
  }
  const userData = await response.json()

  try {
    const response = await refreshAllowancePayments()
    if (!response.ok) {
      const parsedData = await response.json()
      const newError = new Error(parsedData.statusText)
      throw newError
    }
  } catch (error) {
    console.log(
      `Error in processing overdue allowance payments: `,
      error.message,
    )
  }

  return userData
}

export default getCurrentUser
