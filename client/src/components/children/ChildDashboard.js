import React, { useState, useEffect } from "react"
import getChildRelations from "../../services/fetch/getChildRelations"
import Balance from "../utilities/Balance"
import BalanceChart from "../utilities/BalanceChart"
import ChoreTileRegular from "./ChoreTileRegular"
import ChildPhoto from "../utilities/ChildPhoto"
import sortChoresWithinChild from "../../services/sortChoresWithinChild"
import addCashoutToChildRelations from "../../services/addCashoutToChildRelations"
import Quiz from "./Quiz"
import checkQuizEligible from "../../services/checkQuizEligible"
import showDate from "../../utilities/showDate"
import CashoutForm from "./CashoutForm"

const ChildDashboard = (props) => {
  const [showQuiz, setShowQuiz] = useState(false)
  const [showCashout, setShowCashout] = useState(false)
  const [quizEligible, setQuizEligible] = useState(false)
  const [childRelations, setChildRelations] = useState({
    chores: [],
    transactions: [],
    balance: 0,
    allowance: {},
  })

  const child = {
    ...props.user,
    ...childRelations,
  }

  const addCashoutState = (cashoutTransaction) => {
    const updatedChildRelations = addCashoutToChildRelations(cashoutTransaction, childRelations)
    setChildRelations(updatedChildRelations)
  }

  const updateChoreState = (updatedChore) => {
    const newChoreList = childRelations.chores.filter((chore) => {
      return chore.id != updatedChore.id
    })
    newChoreList.push(updatedChore)
    const updatedChildRelations = {
      ...childRelations,
      chores: newChoreList,
    }
    setChildRelations(sortChoresWithinChild(updatedChildRelations))
  }

  const addTranscation = (newTransaction) => {
    const updatedTransactions = [...childRelations.transactions, newTransaction]
    const newBalance =
      parseFloat(childRelations.balance) + parseFloat(newTransaction.amount)
    const updatedChildRelations = {
      ...childRelations,
      transactions: updatedTransactions,
      balance: newBalance,
    }
    setChildRelations(updatedChildRelations)
  }

  const changeQuizDate = (newQuizDate) => {
    const updatedUser = {
      ...props.user,
      quizDate: newQuizDate,
    }
    props.setCurrentUser(updatedUser)
    setQuizEligible(false)
  }

  let choreList = <div className="empty">Chores will appear when assigned</div>
  if (child.chores.length > 0) {
    choreList = childRelations.chores.map((chore) => {
      return (
        <ChoreTileRegular
          key={chore.id}
          chore={chore}
          updateChoreState={updateChoreState}
        />
      )
    })
  }

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChildRelations = await getChildRelations()
      setChildRelations(sortChoresWithinChild(fetchedChildRelations))
    }
    fetchedData()
  }, [])

  const handleQuizClick = () => {
    setShowQuiz(true)
  }

  let popOutBox = null
  if (showQuiz) {
    popOutBox = (
      <Quiz
        changeQuizDate={changeQuizDate}
        addTranscation={addTranscation}
        setShowQuiz={setShowQuiz}
        child={child}
      />
    )
  } else if (showCashout) {
    popOutBox = <CashoutForm
                  addCashoutState={addCashoutState}
                  child={child}
                  setShowCashout={setShowCashout}
                />
  }

  if (checkQuizEligible(child.quizDate)) {
    if (!quizEligible) {
      setQuizEligible(true)
    }
  }

  let showBalanceChart = false
  if (child.transactions.length > 0) {
    showBalanceChart = true
  }

  return (
    <div className="grid-x grid-margin-y align-center child-dash-scroll">
      <div className="cell child-dash-title">{child.nickname}</div>
      <div className="cell small-12 grid-x align-center">
        {popOutBox}
        <span className="cell small-10 child-dash-top-left">
          <ChildPhoto child={child} />
          {quizEligible ? (
            <span className="button-styling-quiz" onClick={handleQuizClick}>
              Quiz Me!
            </span>
          ) : (
            <span className="waiting-quiz">
              Next quiz will become available 7 days after your last quiz,
              which you took on {showDate(new Date(child.quizDate))}
            </span>
          )}
        </span>
        <div className="cell horizontal-line" />
        <span className="cell small-12 child-dash-top-right">
          <Balance user={props.user} child={child} setShowCashout={setShowCashout} />
        </span>
      </div>
      <div className="cell horizontal-line" />
      <div className="cell small-11 medium-9 large-8">
        <div className="chart-container">
          <div className="cell child-dash-title">Balance Over Time</div>
          {showBalanceChart ?
            <BalanceChart child={child} />
          :
            <div className="empty">Chart will appear after your first transaction</div>
          }
        </div>
      </div>
      <div className="cell grid-x grid-margin-x">
        <div className="cell small-12 child-dash-bottom-left">
          <div className="horizontal-line"/>
          <br/>
          <h3 className="child-dash-title cell">My Assigned Chores</h3>
          <div className="grid-x grid-margin-x align-center">{choreList}</div>
        </div>
      </div>
    </div>
  )
}

export default ChildDashboard
