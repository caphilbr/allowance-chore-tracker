import React from "react"

const AllowanceSummary = (props) => {
  const handleManageAllowClick = () => {
    props.setShowManageAllowance(true)
  }

  return (
    <div className="allowance-summary">
      {props.allowance ? (
        <>
          <p>Current Allowance</p>
          <div className="horizontal-line" />
          <table>
            <tbody>
              <tr>
                <th>Frequency</th>
                <td className="align-amt-right">{props.allowance.frequency}</td>
              </tr>
              <tr>
                <th>End Date</th>
                <td className="align-amt-right">{props.allowance.lastDate}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td className="align-amt-right">
                  ${props.allowance.amount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <div className="empty">No allowance has been set</div>
      )}
      <div className="manage-allowance-button-container">
        <span className="detail-option-button" onClick={handleManageAllowClick}>
          Manage Allowance
        </span>
      </div>
    </div>
  )
}

export default AllowanceSummary
