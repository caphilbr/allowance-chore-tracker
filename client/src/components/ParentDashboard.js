import React, { useState, useEffect } from 'react'
import ChildDetails from "./ChildDetails"
import ChildTile from "./ChildTile"
import getChildren from "../services/getChildren"
import AddChild from './AddChild'

const ParentDashboard = () => {

  const [showAddChild, setShowAddChild] = useState(false)
  const [emailStatus, setEmailStatus] = useState("")
  const [children, setChildren] = useState([])
  const [selectedChild, setSelectedChild] = useState({
    username: "",
    nickname: "",
    chores: [],
    imageUrl: ""
  })

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChildren = await getChildren()
      setChildren(fetchedChildren)
    }
    fetchedData()
  },[])

    
  const toggleAddChild = () => {
    setShowAddChild(!showAddChild)
  }

  const childrenList = children.map(child => {
    return <ChildTile key={child.id} child={child} setSelectedChild={setSelectedChild} />
  })
  
  const childCount = children.length
  if (childCount >= 1 && selectedChild.username == "") {
    setSelectedChild(children[0])
  }
  
  let emailMessage = ""
  if (emailStatus === "success") {
    emailMessage = <p className="email-message">Email invite successfully sent!</p>
  }
  if (emailStatus === "error") {
    emailMessage = <p className="email-message">ERROR in sending email invite</p>
  }

  let contentHolder = (
    <>
      <div className="cell small-4 large-2 child-list">
        <h3 className="child-list-header">Children</h3>
        <div className="add-child-button"><span className="button-styling" onClick={toggleAddChild}>Add Child</span></div>
        <div className="scroll">
          {childrenList}
        </div>
      </div>
      <div className="cell small-7 large-9">
        {showAddChild ?
          <AddChild showAddChild={showAddChild} setShowAddChild={setShowAddChild} setEmailStatus={setEmailStatus} />
        :
          <ChildDetails child={selectedChild} />
        }
      </div>    
    </>
  )
  
  if (childCount == 0) {
    contentHolder = (
      <>
        <div className="cell invite-container">
          <h3 className="child-list-header">Begin by adding a child to the family...</h3>
          {showAddChild ?
            <AddChild showAddChild={showAddChild} setShowAddChild={setShowAddChild} setEmailStatus={setEmailStatus} />
            :
            <>
              <div className="add-child-button"><span className="button-styling" onClick={toggleAddChild}>Add Child</span></div>
              {emailMessage}
            </>
          }
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

