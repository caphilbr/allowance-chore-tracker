import React, { useState, useEffect } from 'react'
import ChildDetails from "./ChildDetails"
import ChildTile from "./ChildTile"
import getChildren from "../services/getChildren"

const ParentDashboard = () => {

  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState({
    name: "",
    chores: [],
    imageUrl: ""
  })

  const childrenList = children.map(child => {
    return <ChildTile key={child.id} child={child} setSelectedChild={setSelectedChild} />
  })

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChildren = await getChildren()
      setChildren(fetchedChildren)
    }
    fetchedData()
  },[])

  return (
    <div className="grid-x">
      <div className="cell small-5 large-3 child-list">
        <h3 className="child-list-headers">Children</h3>
        <div className="add-child-button"><span className="button-styling">Add New Child</span></div>
        <div className="scroll">
          {childrenList}
        </div>
      </div>
      <div className="cell small-7 large-9">
        <ChildDetails child={selectedChild}/>
      </div>
    </div>
  )
}

export default ParentDashboard

