import React from "react";

const ChoreTileRegular = (props) => {

  let description = null
  if ((props.chore.description).trim() !== "") {
    description = (
      <div className="cell small-12 medium-8 large-7 description">
        <p>Description:</p>
        <p>{props.chore.description}</p>
      </div>
    )     
  }

  return(
    <div className="cell small-12 chore-tile-regular grid-x grid-margin-x">
      <div className="cell small-12 medium-8 large-5">
        <p className="chore-title-regular">{props.chore.name} - ${props.chore.amount}</p>
        <p>Due: {(props.chore.dueDate).slice(0, 10)}</p>
      </div>
      {description}
    </div> 
  )
}

export default ChoreTileRegular