import React from "react"
import ParentDashboard from "./../parents/ParentDashboard"
import ChildDashboard from "../children/ChildDashboard"

const Dashboard = (props) => {
  let mainContent = (
    <ChildDashboard user={props.user} setCurrentUser={props.setCurrentUser} />
  )
  if (props.user.isParent) {
    mainContent = <ParentDashboard user={props.user} />
  }

  return (
    <div className="background-color dashboard-container">
      {mainContent}
    </div>
  )
}

export default Dashboard
