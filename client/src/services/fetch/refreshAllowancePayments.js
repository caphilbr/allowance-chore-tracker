const refreshAllowancePayments = async () => {
  try {
    const response = await fetch("/api/v1/transaction")
    if (!response.ok) {
      const parsedData = await response.json()
      const newError = new Error(parsedData.statusText)
      throw newError
    }
    return { ok: true }
  } catch(error) {
    console.log(
      `Error in processing overdue allowance payments: `,
      error.message,
    )
    return { ok: false }
  }
}

export default refreshAllowancePayments
