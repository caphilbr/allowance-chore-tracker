import React from "react"
import Balance from "./Balance"
import ChoreTileSmall from "./ChoreTileSmall"

const ChildDetails = (props) => {
  
  const choreList = props.child.chores.map(chore => {
    return <ChoreTileSmall key={chore.id} chore={chore} />
  })

  let details = (
    <>
      <h3 className="child-list-headers">{props.child.name}'s Details</h3>
      <div className="grid-x child-details scroll">
        <div className="cell small-6 details-left">
          <img src={props.child.imageUrl}/>
          <p>{props.child.name}</p>
        </div>
        <div className="cell small-6 details-right">
          <Balance />
          <p>other details go here</p>
        </div>
        <div className="cell grid-x grid-padding-x grid-margin-x grid-margin-y">
          {choreList}
        </div>
      </div>
    </>
  )

  if (props.child.name === "") {
    details = (
      <div className="">
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