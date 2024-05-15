import React from "react"

const Photo = (props) => {

  return(
    <>
      <img src={props.child.imageUrl}/>
      <p>{props.child.name}</p>
      <span className="button-styling">Change Photo</span>
    </>

  )
}

export default Photo