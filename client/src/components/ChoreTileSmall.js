import React from "react";

const ChoreTileSmall = (props) => {


  const handleAccept = async () => {
    try {
      const response = await fetch(
        `/api/v1/chore/pay/${props.chore.id}`,
        { method: "PATCH" }
      )
      location.href = "/dashboard"
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <div className="cell small-12 medium-6 large-3 chore-tile-small">
      <p className="chore-title-small">{props.chore.name} - ${props.chore.amount}</p>
      <p>Due: {(props.chore.dueDate).slice(0, 10)}</p>
      {props.chore.status == "pending" ?
        <p><span className="button-styling-small-accept" onClick={handleAccept}>Accept as Completed</span></p>
      :
        null
      }
      <p>
        <span className="button-styling-small">Edit</span>
        <span className="button-styling-small-delete">Delete</span>
      </p>
    </div> 
  )
}

export default ChoreTileSmall