import express from "express"
import OpenTriviaClient from "../../../apiClient/OpenTriviaClient.js"

const quizRouter = express.Router()

quizRouter.get("/", async (req, res) => {
  try {
    const quizResponse = await OpenTriviaClient.getQuestion()
    res
      .status(200)
      .set({ "Content-Type": "application/json" })
      .json({ question: quizResponse.question })
  } catch (error) {
    res.status(401).json({ errors: error })
  }
})

export default quizRouter
