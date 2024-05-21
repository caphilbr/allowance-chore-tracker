import React from "react";

const ChoreTileRegular = (props) => {

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/v1/chore/submit/${props.chore.id}`,
        { method: "PATCH" }
      )
      location.href = "/dashboard"
    } catch(error) {
      console.log(error)
    }
  }
  
  let description = null
  if ((props.chore.description).trim() !== "") {
    description = (
      <div className="cell small-6 description">
        <p>Description:</p>
        <p>{props.chore.description}</p>
      </div>
    )     
  }

  return(
    <div className="cell small-12 chore-tile-regular grid-x grid-margin-x">
      <div className="cell small-6">
        <p className="chore-title-regular">{props.chore.name} - ${props.chore.amount}</p>
        <p>Due: {(props.chore.dueDate).slice(0, 10)}</p>
      </div>
      <p className="cell small-5 chore-tile-buttons">
        {props.chore.status == "open" ?
          <span className="button-styling" onClick={handleSubmit}>Submit for Payment</span>
        :
          <span className="awaiting-approval" onClick={handleSubmit}>Awaiting Approval from Parent</span>
        }
      </p>
      {description}
    </div> 
  )
}

export default ChoreTileRegular