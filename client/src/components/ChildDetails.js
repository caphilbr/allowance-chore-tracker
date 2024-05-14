import React from "react"

const ChildDetails = (props) => {
  
  const details = (
    <div className="grid-x">
      <div className="cell small-6">
        <img src={props.child.imageUrl}/>
        <h3>{props.child.name}</h3>
      </div>
      <div className="cell small-6">
        <p>other details go here</p>
      </div>
    </div>
  )

  const noSelection = (
    <h4>Select a child from the left</h4>
  )



  return (
    <>
      {(props.child.name === '') ? noSelection : details}
    </>
  )
}

export default ChildDetails