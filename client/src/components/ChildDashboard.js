import React, { useState, useEffect } from "react";
import ChoreTileSmall from "./ChoreTileSmall";
import getChild from "../services/getChild";
import Balance from "./Balance"

const ChildDashboard = (props) => {
  const [child, setChild] = useState({
    name: "",
    chores: [],
    imageUrl: ""
  })

  const choreList = child.chores.map(chore => {
    return <ChoreTileSmall key={chore.id} chore={chore} />
  })

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChild = await getChild()
      setChild(fetchedChild)
    }
    fetchedData()
  },[])

  return (
    <div className="grid-x">
      <div className="cell">
        <Balance />
      </div>
      <div className="cell">
        <h3 className="child-list-headers">Chores</h3>
        <div className="scroll">
          {choreList}
        </div>
      </div>
    </div>
  )
}

export default ChildDashboard