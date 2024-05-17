import React, { useState, useEffect } from "react";
import getChild from "../services/getChild";
import Balance from "./Balance"
import BalanceChart from "./BalanceChart";
import ChoreTileRegular from "./ChoreTileRegular";
import ChildPhoto from "./ChildPhoto";

const ChildDashboard = (props) => {

  const [child, setChild] = useState({
    name: "",
    chores: [],
    imageUrl: "",
    balance: 0
  })

  const choreList = child.chores.map(chore => {
    return <ChoreTileRegular key={chore.id} chore={chore} />
  })

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChild = await getChild()
      setChild(fetchedChild)
    }
    fetchedData()
  },[])

  return (
    <div className="grid-x grid-margin-y align-center">
      <div className="cell small-8 medium-6 large-2 child-dash-top-left">
        <ChildPhoto child={child} />
      </div>
      <div className="cell small-12 large-9 child-dash-top-right"> 
        <div className="grid-x">
          <div className="cell small-12 large-3">
            <Balance child={child} />
          </div>
          <div className="cell small-12 large-8">
            <BalanceChart child={child} />
          </div>
        </div>
      </div>
      <div className="cell grid-x grid-margin-x">
        <div className="cell small-6 child-dash-bottom-left">
          <h3 className="child-list-header cell">My Assigned Chores</h3>
          <div className="scroll grid-x grid-margin-x">
            {choreList}
          </div>
        </div>
        <div className="cell auto">
          <h3 className="chart">for future use</h3>
        </div>
      </div>
    </div>
  )
}

export default ChildDashboard