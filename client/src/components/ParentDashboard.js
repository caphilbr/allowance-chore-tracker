import React, { useState, useEffect } from "react";
import ChildDetails from "./ChildDetails";
import ChildTile from "./ChildTile";
import getChildren from "../services/getChildren";
import AddChild from "./AddChild";
import sortChoresWithinChildren from "../services/sortChoresWithinChildren";
import removeChoreFromChildren from "../services/removeChoreFromChildren";
import payChoreAndUpdateChildren from "../services/payChoreAndUpdateChildren";
import editChoreWithinChildren from "../services/editChoreWithinChildren";
import addTransactionToChildren from "../services/addTransactionToChildren"
import addChoreToChildren from "../services/addChoreToChildren"
import ChildListHorizontal from "./ChildListHorizontal";

const ParentDashboard = () => {
  const [showAddChild, setShowAddChild] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);

  useEffect(() => {
    const fetchedData = async () => {
      const fetchedChildren = await getChildren();
      setChildren(sortChoresWithinChildren(fetchedChildren));
    };
    fetchedData();
  }, []);

  const toggleAddChild = () => {
    setShowAddChild(!showAddChild);
  };

  const addTranscation = (transactionToAdd) => {
    const updatedChildren = addTransactionToChildren(transactionToAdd, children);
    setChildren(updatedChildren)
  }

  const addChoreToList = (choreToAdd) => {
    const updatedChildren = addChoreToChildren(choreToAdd, children);
    setChildren(sortChoresWithinChildren(updatedChildren));
  };

  const removeChore = (choreToRemove) => {
    const updatedChildren = removeChoreFromChildren(choreToRemove, children);
    setChildren(sortChoresWithinChildren(updatedChildren));
  };

  const editChore = (choreToEdit) => {
    const updatedChildren = editChoreWithinChildren(choreToEdit, children);
    setChildren(sortChoresWithinChildren(updatedChildren));
  };

  const payChore = (choreToPay, newTransaction) => {
    const updatedChildren = payChoreAndUpdateChildren(choreToPay, newTransaction, children);
    setChildren(updatedChildren);
    removeChore(choreToPay);
  };

  const childCount = children.length;
  let selectedChild = { chores: [] };
  if (childCount >= 1) {
    let childFound;
    if (!selectedChildId) {
      childFound = [children[0]];
    } else {
      childFound = children.filter((child) => {
        return child.id == selectedChildId;
      });
    }
    selectedChild = childFound[0];
  }

  const childrenList = children.map((child) => {
    return (
      <ChildTile
        key={child.id}
        child={child}
        setSelectedChildId={setSelectedChildId}
        selectedChildId={selectedChildId}
      />
    )
  });

  let emailMessage = "";
  if (emailStatus === "success") {
    emailMessage = <p className="email-message">Email invite successfully sent!</p>;
  }
  if (emailStatus === "error") {
    emailMessage = <p className="email-message">ERROR in sending email invite</p>;
  }

  let contentHolder = (
    <div className="grid-x">
      <ChildListHorizontal toggleAddChild={toggleAddChild} childrenList={childrenList} />
      <div className="cell grid-x align-center">
        {showAddChild ? (
          <AddChild
            showAddChild={showAddChild}
            setShowAddChild={setShowAddChild}
            setEmailStatus={setEmailStatus}
          />
        ) : (
          null
        )}
        <ChildDetails
          child={selectedChild}
          editChore={editChore}
          addChoreToList={addChoreToList}
          removeChore={removeChore}
          payChore={payChore}
          addTranscation={addTranscation}
        />
      </div>
    </div>
  );

  if (childCount == 0) {
    contentHolder = (
      <>
        <div className="cell invite-container">
          <h3 className="parent-dash-title">Begin by adding a child to the family...</h3>
          {showAddChild ? (
            <AddChild
              showAddChild={showAddChild}
              setShowAddChild={setShowAddChild}
              setEmailStatus={setEmailStatus}
            />
          ) : (
            <>
              <div className="add-child-button">
                <span className="button-styling" onClick={toggleAddChild}>
                  Add Child
                </span>
              </div>
              {emailMessage}
            </>
          )}
        </div>
      </>
    );
  }

  return <div className="grid-x align-center">{contentHolder}</div>;
};

export default ParentDashboard;
