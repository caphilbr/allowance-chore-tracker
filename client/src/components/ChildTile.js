import React from 'react'

const ChildTile = (props) => {
  
  const handleChildClick = () => {
    props.setSelectedChildId(props.child.id)
  }

  let styling = "child-tile"
  if (props.child.id == props.selectedChildId) {
    styling = "child-tile-selected"
  }

  return (
    <div onClick={handleChildClick} className={styling}>
      <img src={props.child.imageUrl} className="circle-image"/>
      <p>{props.child.nickname}</p>
    </div>
  )
}

export default ChildTile