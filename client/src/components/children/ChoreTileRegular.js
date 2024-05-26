import React from "react"

const ChoreTileRegular = (props) => {
  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/v1/chore/submit/${props.chore.id}`, {
        method: "PATCH",
      })
      const parsedData = await response.json()
      props.updateChoreState(parsedData.chore)
    } catch (error) {
      console.log(error)
    }
  }

  let description = null
  if (props.chore.description && props.chore.description != "") {
    description = (
      <div className="cell small-6 description">
        <p>Description:</p>
        <p>{props.chore.description}</p>
      </div>
    )
  }

  return (
    <div className="cell small-12 large-6 chore-tile-regular grid-x grid-margin-x">
      <div className="cell">
        <p className="chore-title-regular">
          {props.chore.name} - ${props.chore.amount}
        </p>
        <p>Due: {props.chore.dueDate.slice(0, 10)}</p>
        {description}
      </div>
      <p className="cell chore-tile-buttons">
        {props.chore.status == "open" ? (
          <span className="button-styling" onClick={handleSubmit}>
            Submit for Payment
          </span>
        ) : (
          <span className="awaiting-approval">
            Awaiting Approval from Parent
          </span>
        )}
      </p>
    </div>
  )
}

export default ChoreTileRegular
