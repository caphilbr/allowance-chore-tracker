import React from "react"
import config from "../config"
import ParentDashboard from "./ParentDashboard"
import ChildDashboard from "./ChildDashboard"

const Dashboard = (props) => {

  console.log('user in Dashboard.js ->', props.user)
  let mainContent = <ChildDashboard user={props.user} setCurrentUser={props.setCurrentUser}/>
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