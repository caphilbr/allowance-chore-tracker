import React from 'react'

const ChildTile = (props) => {
  
  const handleChildClick = () => {
    props.setSelectedChildId(props.child.id)
  }

  return (
    <div onClick={handleChildClick} className="cell child-tile">
      <p>{props.child.nickname}</p>
      <img src={props.child.imageUrl} className="circle-image"/>
    </div>
  )
}

export default ChildTile