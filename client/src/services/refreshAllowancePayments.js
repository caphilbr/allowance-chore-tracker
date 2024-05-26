const refreshAllowancePayments = async () => {
  const response = await fetch("/api/v1/transaction")
  return response
}

export default refreshAllowancePayments
