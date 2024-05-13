import React from 'react'

const ChildTile = (props) => {

  console.log(props.child)
  return (
    <>
      <p>{props.child.name}</p>
      <img src={props.child.imageUrl} />
    </>
  )
}

export default ChildTile