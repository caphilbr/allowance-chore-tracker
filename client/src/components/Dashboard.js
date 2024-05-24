import React from "react"
import config from "../config"
import ParentDashboard from "./ParentDashboard"
import ChildDashboard from "./ChildDashboard"

const Dashboard = (props) => {

  let mainContent = <ChildDashboard user={props.user} setCurrentUser={props.setCurrentUser} />
  if (props.user.isParent) {
    mainContent = <ParentDashboard user={props.user} />
  }

  return (
    <div className="background-color">
      <div className="dashboard-title">
        <img
          className="landing-title"
          src={config.dashboardTitleUrl}
        />
      </div>
      {mainContent}
    </div>
  )
}

export default Dashboard