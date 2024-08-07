import React, { useState } from "react"

const ChoreTileSmall = (props) => {
  const [showDelete, setShowDelete] = useState(false)

  const handleAccept = async () => {
    try {
      const response = await fetch(`/api/v1/chore/pay/${props.chore.id}`, {
        method: "PATCH",
      })
      const parsedData = await response.json()
      props.payChore(props.chore, parsedData.transaction)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    setShowDelete(false)
    try {
      await fetch(`/api/v1/chore/${props.chore.id}`, { method: "DELETE" })
      props.removeChore(props.chore)
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteClick = () => {
    setShowDelete(true)
  }

  const cancelDelete = () => {
    setShowDelete(false)
  }

  const handleEdit = () => {
    props.handleEditChore(props.chore)
  }

  let description = null
  if (props.chore.description != "") {
    description = <p>Description: {props.chore.description}</p>
  }

  return (
    <>
      {showDelete ? (
        <div className="cell small-12 medium-6 large-3 chore-tile-small-delete-confirm">
          <p className="chore-title-small">{props.chore.name}</p>
          <p>
            This will delete the chore, including from your child's dashboard.
            The child will not receive payment, even if it was pending
            acceptance as complete.
          </p>
          <span className="button-styling-small-delete" onClick={handleDelete}>
            Confirm Chore Delete
          </span>
          <span className="button-styling-small" onClick={cancelDelete}>
            Cancel
          </span>
        </div>
      ) : (
        <div className="cell small-12 medium-6 large-3 chore-tile-small">
          <p className="chore-title-small">
            {props.chore.name} - ${props.chore.amount}
          </p>
          <p>Due: {props.chore.dueDate.slice(0, 10)}</p>
          {description}
          {props.chore.status == "pending" && (
            <p>
              <span
                className="button-styling-small-accept"
                onClick={handleAccept}
              >
                Accept as Completed
              </span>
            </p>
          )}
          <p>
            {props.chore.status != "pending" && (
              <span className="button-styling-small-pay" onClick={handleAccept}>
                Pay
              </span>
            )}
            <span className="button-styling-small" onClick={handleEdit}>
              Edit
            </span>
            <span
              className="button-styling-small-delete"
              onClick={onDeleteClick}
            >
              Delete
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default ChoreTileSmall
