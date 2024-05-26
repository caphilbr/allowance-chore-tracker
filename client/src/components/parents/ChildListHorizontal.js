import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChildListHorizontal = (props) => {
  return (
    <>
      <div className="cell center-contents">
        <div className="horizontal-scroll">
          <div className="cell child-tile-add" onClick={props.toggleAddChild}>
            <FontAwesomeIcon icon="fas fa-plus-circle" className="fa-4x" />
            <p>Add Child</p>
          </div>
          {props.childrenList}
        </div>
      </div>
    </>
  )
}

export default ChildListHorizontal
