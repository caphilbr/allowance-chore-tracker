import React from 'react'

const ChildTile = (props) => {

  
  const handleChildClick = (event) => {
    props.setSelectedChild(props.child)
  }

  return (
    <div onClick={handleChildClick} className="cell child-tile">
      <p>{props.child.name}</p>
      <img src={props.child.imageUrl} className="circle-image"/>
    </div>
  )
}

export default ChildTile