import React, { useState } from "react"
import Balance from "../shared/Balance"
import ChoreTileSmall from "./ChoreTileSmall"
import ChildPhoto from "../shared/ChildPhoto"
import ManageAllowance from "./ManageAllowance"
import AllowanceSummary from "./AllowanceSummary"
import BalanceChart from "../shared/BalanceChart"
import AddChore from "./AddChore"
import EditChore from "./EditChore"
import ManualTransaction from "./ManualTransaction"

const ChildDetails = (props) => {
  const [showManageAllowance, setShowManageAllowance] = useState(false)
  const [showAddChore, setShowAddChore] = useState(false)
  const [showEditChore, setShowEditChore] = useState(false)
  const [showManualTransaction, setShowManualTransaction] = useState(false)
  const [choreToEdit, setChoreToEdit] = useState({})

  const handleManualTransaction = () => {
    setShowManualTransaction(true)
  }

  const handleAddChore = () => {
    setShowAddChore(true)
  }

  const handleEditChore = (choreFromTile) => {
    setChoreToEdit(choreFromTile)
    setShowEditChore(true)
  }

  const choreList = props.child.chores.map((chore) => {
    return (
      <ChoreTileSmall
        key={chore.id}
        chore={chore}
        payChore={props.payChore}
        removeChore={props.removeChore}
        handleEditChore={handleEditChore}
      />
    )
  })

  let popOutBox = null
  if (showManageAllowance) {
    popOutBox = (
      <ManageAllowance
        setShowManageAllowance={setShowManageAllowance}
        child={props.child}
      />
    )
  } else if (showAddChore) {
    popOutBox = (
      <AddChore
        setShowAddChore={setShowAddChore}
        child={props.child}
        addChoreToList={props.addChoreToList}
      />
    )
  } else if (showEditChore) {
    popOutBox = (
      <EditChore
        setShowEditChore={setShowEditChore}
        editChore={props.editChore}
        chore={choreToEdit}
      />
    )
  } else if (showManualTransaction) {
    popOutBox = (
      <ManualTransaction
        child={props.child}
        setShowManualTransaction={setShowManualTransaction}
        addTranscation={props.addTranscation}
      />
    )
  }

  let details = (
    <>
      <h3 className="cell parent-dash-title">
        {props.child.nickname}'s Details
      </h3>
      <div className="cell popout-container grid-x align-center">
        {popOutBox}
      </div>
      <div className="grid-x grid-margin-x grid-margin-y child-details align-center">
        <div className="cell small-12 large-6 details-left">
          <ChildPhoto child={props.child} />
          <AllowanceSummary
            setShowManageAllowance={setShowManageAllowance}
            allowance={props.child.allowance}
          />
        </div>
        <div className="cell small-12 large-6 details-right">
          <Balance
            user={props.user}
            child={props.child}
            handleManualTransaction={handleManualTransaction}
          />
        </div>
        <div className="cell small-12 horizontal-line" />
        <div className="cell small-12 chart-container">
          <div className="cell child-dash-title-in-parent">
            Balance Over Time
          </div>
          <BalanceChart child={props.child} />
        </div>
        <div className="cell small-12 horizontal-line" />
        <div className="chore-title cell small-12">
          <span className="detail-option-button" onClick={handleAddChore}>
            Add Chore
          </span>
        </div>
        <div className="cell grid-x grid-margin-x grid-margin-y">
          {choreList}
        </div>
      </div>
    </>
  )

  if (props.child.username === "") {
    details = (
      <div>
        <p className="select-child-message">
          Select a child <br /> from the left
        </p>
      </div>
    )
  }

  return <>{details}</>
}

export default ChildDetails
