import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ChildTile = (props) => {
  const handleChildClick = () => {
    props.setSelectedChildId(props.child.id)
  }

  let styling = "cell small-2 child-tile"
  if (props.child.id == props.selectedChildId) {
    styling = "cell small-2 child-tile-selected"
  }

  let photo = <FontAwesomeIcon icon="fas fa-user" className="fa-2x"/>
  if (props.child.imageUrl != null && props.child.imageUrl != "") {
    photo = <img src={props.child.imageUrl} className="circle-image" />
  }

  return (
    <div onClick={handleChildClick} className={styling}>
      {photo}
      <p>{props.child.nickname}</p>
    </div>
  )
}

export default ChildTile
