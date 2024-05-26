import React, { useState, useEffect } from "react"
import getQuizQuestion from "./../../services/getQuizQuestion"
import parse from "html-react-parser"
import postQuizResponse from "./../../services/postQuizResponse"

export const Quiz = (props) => {
  const [questionObject, setQuestionObject] = useState({
    question: "",
    correct_answer: "",
    incorrect_answers: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [responseStatus, setResponseStatus] = useState(null)

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await getQuizQuestion()
        if (!response.ok) {
          const newError = new Error(response.statusText)
          throw newError
        }
        setQuestionObject(response.body)
        setIsLoading(false)
      } catch (error) {
        console.log("error in fetching question: ", error.message)
        setIsLoading(false)
        handleClose()
      }
    }
    setIsLoading(true)
    initialFetch()
  }, [])

  const handleClose = () => {
    props.setShowQuiz(false)
  }

  const handleAnswerChoice = async (event) => {
    if (responseStatus == null) {
      const answer = event.currentTarget.getAttribute("value")
      if (answer == correctAnswer) {
        try {
          setResponseStatus("correct")
          const response = await postQuizResponse(true, props.child.id)
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.error.message})`
            const error = new Error(errorMessage)
            throw error
          } else {
            const newTransaction = response.transaction.body
            const updatedQuizDate = response.user.body.quizDate
            props.addTranscation(newTransaction)
            props.changeQuizDate(updatedQuizDate)
          }
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
          // location.href = "/dashboard";
        }
      } else {
        try {
          setResponseStatus("incorrect")
          const response = await postQuizResponse(false, props.child.id)
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.error.message})`
            const error = new Error(errorMessage)
            throw error
          } else {
            const newTransaction = response.transaction.body
            const updatedQuizDate = response.user.body.quizDate
            props.addTranscation(newTransaction)
            props.changeQuizDate(updatedQuizDate)
          }
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`)
          // location.href = "/dashboard";
        }
      }
    }
  }

  const question = parse(questionObject.question)
  const correctAnswer = questionObject.correct_answer
  let answerList = null
  if (correctAnswer != "") {
    const answerOptions = [
      ...questionObject.incorrect_answers,
      questionObject.correct_answer,
    ]
    answerList = answerOptions.map((answerChoice) => {
      return (
        <div key={answerChoice} className="cell small-5">
          <span
            className="quiz-answers"
            onClick={handleAnswerChoice}
            value={answerChoice}
          >
            {parse(answerChoice)}
          </span>
        </div>
      )
    })
  }

  const questionDisplay = (
    <>
      <h3>Quiz Time!</h3>
      <h5>
        You get $1 for answering, plus <br />
        another $1 if you get the correct response!
      </h5>
      <div className="grid-x grid-margin-x grid-margin-y align-center quiz-answer-container">
        <p className="cell">{question}</p>
        {answerList}
      </div>
      <span className="button-styling" onClick={handleClose}>
        Close
      </span>
    </>
  )

  const loadingDisplay = (
    <>
      <h1>Quiz Time!</h1>
      <span className="button-styling-loading">Loading</span>
    </>
  )

  const incorrectDisplay = (
    <>
      <h3>Incorrect</h3>
      <span className="button-styling" onClick={handleClose}>
        Close
      </span>
    </>
  )

  const correctDisplay = (
    <>
      <h3>Correct</h3>
      <span className="button-styling" onClick={handleClose}>
        Close
      </span>
    </>
  )

  let quizDisplay = loadingDisplay
  if (!isLoading) {
    if (responseStatus == "correct") {
      quizDisplay = correctDisplay
    }
    if (responseStatus == "incorrect") {
      quizDisplay = incorrectDisplay
    }
    if (responseStatus == null) {
      quizDisplay = questionDisplay
    }
  }

  return <div className="popout-box-quiz">{quizDisplay}</div>
}

export default Quiz
