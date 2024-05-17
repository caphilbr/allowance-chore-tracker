import React from "react"
import Balance from "./Balance"
import ChoreTileSmall from "./ChoreTileSmall"
import ChildPhoto from "./ChildPhoto"

const ChildDetails = (props) => {
  
  const choreList = props.child.chores.map(chore => {
    return <ChoreTileSmall key={chore.id} chore={chore} />
  })
  let details = (
    <>
      <h3 className="child-detail-header">{props.child.nickname}'s Details</h3>
      <div className="grid-x grid-margin-x grid-margin-y child-details scroll">
        <div className="cell small-6 details-left">
          <ChildPhoto child={props.child} />
        </div>
        <div className="cell small-6 details-right">
          <Balance child={props.child} />
        </div>
        <div className="cell grid-x grid-margin-x grid-margin-y">
          {choreList}
        </div>
      </div>
    </>
  )

  if (props.child.name === "") {
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