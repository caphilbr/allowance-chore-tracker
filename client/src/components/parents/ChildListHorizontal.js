import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChildListHorizontal = (props) => {
  return (
    <>
      <div className="cell grid-x align-center">
        <div className="cell small-2 child-tile-add" onClick={props.toggleAddChild}>
          <FontAwesomeIcon icon="fas fa-plus-circle" className="fa-2x" />
          <p>Add Child</p>
        </div>
        {props.childrenList}
      </div>
    </>
  )
}

export default ChildListHorizontal
