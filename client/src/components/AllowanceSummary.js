import React from "react";

const AllowanceSummary = (props) => {
  const handleManageAllowClick = () => {
    props.setShowManageAllowance(true);
  };

  return (
    <div className="allowance-summary">
      {props.allowance ? (
        <>
          <p>Current Allowance</p>
          <div className="horizontal-line" />
          <table>
            <thead>
              <tr>
                <th>Frequency</th>
                <th>End Date</th>
                <th className="align-amt-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.allowance.frequency}</td>
                <td>{props.allowance.lastDate}</td>
                <td className="align-amt-right">${props.allowance.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>No allowance has been set</p>
      )}
      <div className="popout-box-button-container">
        <span className="detail-option-button" onClick={handleManageAllowClick}>
          Manage Allowance
        </span>
      </div>
    </div>
  );
};

export default AllowanceSummary;
