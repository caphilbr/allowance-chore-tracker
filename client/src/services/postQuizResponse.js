import postTransaction from './postTransaction'
import patchUser from './patchUser'

const postQuizResponse = async (isCorrect, userId) => {

  let amount = "1"
  let type = "quiz: incorrect"
  if (isCorrect) {
    amount = "2"
    type = "quiz: correct"
  }
  const newTransaction = {
    amount: amount,
    type: type,
    paymentDate: new Date(),
    userId: userId
  }

  const transactionResponse = await postTransaction(newTransaction)
  if (!transactionResponse.ok) {
    return transactionResponse
  }
  const userResponse = await patchUser({ quizDate: new Date() })
  if (!userResponse.ok) {
    return userResponse
  }

  return { ok: true, status: 200, transaction: transactionResponse, user: userResponse }
}

export default postQuizResponse