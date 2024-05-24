import React, { useState, useEffect } from "react";
import getChildRelations from "../services/getChildRelations";
import Balance from "./Balance";
import BalanceChart from "./BalanceChart";
import ChoreTileRegular from "./ChoreTileRegular";
import ChildPhoto from "./ChildPhoto";
import sortChoresWithinChild from "../services/sortChoresWithinChild";

const ChildDashboard = (props) => {
  const [childRelations, setChildRelations] = useState({
    chores: [],
    transactions: [],
    balance: 0,
    allowance: {}
  });

  const child = {
    ...props.user,
    ...childRelations
  }
  console.log(child)

  const updateChoreState = (updatedChore) => {
    const newChoreList = childRelations.chores.filter((chore) => {
      return chore.id != updatedChore.id;
    });
    newChoreList.push(updatedChore);
    const updatedChildRelations = {
      ...childRelations,
      chores: newChoreList,
    };
    setChildRelations(sortChoresWithinChild(updatedChildRelations));
  };

  const choreList = childRelations.chores.map((chore) => {
    return <ChoreTileRegular key={chore.id} chore={chore} updateChoreState={updateChoreState} />;
  });

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChildRelations = await getChildRelations();
      setChildRelations(sortChoresWithinChild(fetchedChildRelations));
    };
    fetchedData();
  }, []);

  return (
    <div className="grid-x grid-margin-y align-center child-dash-scroll">
      <div className="cell child-dash-title">{child.nickname}</div>
      <div className="cell small-12 grid-x align-center">
        <span className="cell small-4 child-dash-top-left">
          <ChildPhoto child={child} />
        </span>
        <span className="cell small-7 child-dash-top-right">
          <Balance child={child} />
        </span>
      </div>
      <div className="cell small-11 medium-9 large-8">
        <div className="chart-container">
          <div className="cell child-dash-title">Balance Over Time</div>
          <BalanceChart child={child} />
        </div>
      </div>
      <div className="cell grid-x grid-margin-x">
        <div className="cell small-12 child-dash-bottom-left">
          <h3 className="child-dash-title cell">My Assigned Chores</h3>
          <div className="grid-x grid-margin-x">{choreList}</div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
