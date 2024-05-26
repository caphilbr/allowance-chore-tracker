import got from "got"

class OpenTriviaClient {
  static async getQuestion() {
    try {
      const url = `https://opentdb.com/api.php?amount=1&difficulty=easy`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      const parsedBody = JSON.parse(responseBody)
      const question = parsedBody.results[0]
      return { question }
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default OpenTriviaClient
