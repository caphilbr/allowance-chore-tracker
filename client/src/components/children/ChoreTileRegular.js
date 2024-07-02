import React from "react"
import patchSubmitChore from "../../services/fetch/patchSubmitChore"

const ChoreTileRegular = (props) => {
  const handleSubmit = async () => {
    const response = await patchSubmitChore(props.chore.id)
    if (response.ok) {
      props.updateChoreState(response.chore)
    }
  }

  return (
    <div className="cell small-12 large-6 chore-tile-regular grid-x grid-margin-x">
      <div className="cell">
        <p className="chore-title-regular">
          {props.chore.name} - ${props.chore.amount}
        </p>
        <p>Due: {props.chore.dueDate.slice(0, 10)}</p>
        {props.chore.description && props.chore.description != "" &&
          <div className="cell small-6 description">
            <p>Description:</p>
            <p>{props.chore.description}</p>
          </div>
        }
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
