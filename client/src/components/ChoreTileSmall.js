import React from "react";

const ChoreTileSmall = (props) => {

  return(
    <div className="cell small-12 medium-6 large-3 chore-tile-small">
      <p className="chore-title-small">{props.chore.name} - ${props.chore.amount}</p>
      <p>Due: {(props.chore.dueDate).slice(0, 10)}</p>
    </div> 
  )
}

export default ChoreTileSmall