import React, { useState, useEffect } from 'react'
import ChildDetails from "./ChildDetails"
import ChildTile from "./ChildTile"
import getChildren from "../services/getChildren"

const ParentDashboard = () => {

  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState({
    name: "",
    imageUrl: ""
  })

  const childrenList = children.map(child => {
    return <ChildTile key={child.id} child={child} setSelectedChild={setSelectedChild} />
  })

  useEffect(() => {
    getChildren(setChildren)
  },[])

  return (
    <div className="grid-x">
      <div className="cell small-5 medium-4 large-3 child-list">
        <h3 className="child-list-headers">Children</h3>
        <p className="add-child-button">Add New Child</p>
        <div className="scroll">
          {childrenList}
        </div>
      </div>
      <div className="cell small-7 medium-8 large-9">
        <ChildDetails child={selectedChild}/>
      </div>
    </div>
  )
}

export default ParentDashboard

