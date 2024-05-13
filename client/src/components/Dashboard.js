import React, { useEffect, useState } from "react"
import config from "../config"
import getChildren from "../services/getChildren"
import ChildTile from "./ChildTile"

const Dashboard = () => {
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState({})

  const childrenList = children.map(child => {
    return <ChildTile child={child} setSelectedChild={setSelectedChild} />
  })

  useEffect(() => {
    getChildren(setChildren)
  },[])

  return (
    <div className="background-color">
      <div className="dashboard-title">
        <img
          className="landing-title"
          src={config.dashboardTitleUrl}
        />
      </div>
      {childrenList}
    </div>
  )
}

export default Dashboard