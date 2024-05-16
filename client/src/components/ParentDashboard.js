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
  
  const childCount = children.length
  if (childCount >= 1 && selectedChild.name == "") {
    setSelectedChild(children[0])
  }

  let contentHolder = (
    <>
      <div className="cell small-4 large-2 child-list">
        <h3 className="child-list-header">Children</h3>
        <div className="add-child-button"><span className="button-styling">Add Child</span></div>
        <div className="scroll">
          {childrenList}
        </div>
      </div>
      <div className="cell small-7 large-9">
        <ChildDetails child={selectedChild} />
      </div>    
    </>
  )

  if (childCount == 0) {
    contentHolder = (
      <>
        <div className="cell child-list">
          <h3 className="child-list-header">Begin by adding a child to the family...</h3>
          <div className="add-child-button"><span className="button-styling">Add Child</span></div>
        </div>
      </>
    )
  }

  return (
    <div className="grid-x">
      {contentHolder}
    </div>
  )
}

export default ParentDashboard

