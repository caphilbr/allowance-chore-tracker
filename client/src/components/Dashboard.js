import React, { useState } from "react"
import config from "../config"
import ParentDashboard from "./ParentDashBoard"
import ChildDashboard from "./ChildDashboard"

const Dashboard = (props) => {

  let mainContent = <ChildDashboard />
  if (props.user.isParent) {
    mainContent = <ParentDashboard />
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