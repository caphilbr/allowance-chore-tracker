import React from "react"

const ChildPhoto = (props) => {

  return(
    <>
      <img src={props.child.imageUrl}/>
      <p>{props.child.name}</p>
      <span className="button-styling">Change Photo</span>
    </>

  )
}

export default ChildPhoto