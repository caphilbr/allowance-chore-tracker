import React, { useState } from "react"
import Balance from "./Balance"
import ChoreTileSmall from "./ChoreTileSmall"
import ChildPhoto from "./ChildPhoto"
import ManageAllowance from "./ManageAllowance"
import AllowanceSummary from "./AllowanceSummary"

const ChildDetails = (props) => {
  
  const [showManageAllowance, setShowManageAllowance] = useState(false)

  const choreList = props.child.chores.map(chore => {
    return <ChoreTileSmall key={chore.id} chore={chore} />
  })
  let details = (
    <>
      <h3 className="child-detail-header">{props.child.nickname}'s Details</h3>
      {showManageAllowance ?
        <ManageAllowance
          setShowManageAllowance={setShowManageAllowance}
          child={props.child}
        />
      :
        null
      }
      <div className="grid-x grid-margin-x grid-margin-y child-details scroll">
        <div className="cell small-12 large-6 details-left">
          <ChildPhoto child={props.child} />
          <AllowanceSummary setShowManageAllowance={setShowManageAllowance} allowance={props.child.allowance} />
        </div>
        <div className="cell small-12 large-6 details-right">
          <Balance child={props.child} />
        </div>
        <div className="cell small-12 horizontal-line" />
        <div className="chore-title cell small-12">
          <span className="detail-option-button">Manage Chores</span>
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
        <p className="select-child-message">Select a child <br/> from the left</p>
      </div>
    )
  }

  return (
    <>
      {details}
    </>
  )
}

export default ChildDetails