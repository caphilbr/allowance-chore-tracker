import React, { useState, useEffect } from "react"
import getQuizQuestion from "../../services/fetch/getQuizQuestion"
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
      const response = await getQuizQuestion()
      if (response.ok) {
        setQuestionObject(response.body)
        setIsLoading(false)
      } else {
        handleClose()
        setIsLoading(false)
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
      let response
      if (answer == correctAnswer) {
        setResponseStatus("correct")
        response = await postQuizResponse(true, props.child.id)
      } else {
        setResponseStatus("incorrect")
        response = await postQuizResponse(false, props.child.id)
      }
      if (response.ok) {
        const newTransaction = response.transaction.body
        const updatedQuizDate = response.user.body.quizDate
        props.addTranscation(newTransaction)
        props.changeQuizDate(updatedQuizDate)
      } else {
        location.href = "/dashboard";
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
        $1 for playing, $2 for correct answers
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
      <h3>Incorrect, but you still get $1</h3>
      <span className="button-styling" onClick={handleClose}>
        Close
      </span>
    </>
  )

  const correctDisplay = (
    <>
      <h3>Correct! You have been credited $2</h3>
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

  return <div className="cell small-11 popout-box-quiz">{quizDisplay}</div>
}

export default Quiz
