import React, { useState, useEffect } from "react";
import getChild from "../services/getChild";
import Balance from "./Balance";
import BalanceChart from "./BalanceChart";
import ChoreTileRegular from "./ChoreTileRegular";
import ChildPhoto from "./ChildPhoto";
import sortChoresWithinChild from "../services/sortChoresWithinChild";
import Quiz from "./Quiz"
import checkQuizEligible from "../services/checkQuizEligible";


const ChildDashboard = (props) => {
  const [quizEligible, setQuizEligle] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  // const [child, setChild] = useState({
  //   name: "",
  //   chores: [],
  //   transactions: [],
  //   imageUrl: "",
  //   balance: 0,
  //   quizDate: '2100-12-31'
  // });

  console.log('user in ChildDashboard.js ->', props.user)

  const updateChoreState = (updatedChore) => {
    const newChoreList = props.user.chores.filter((chore) => {
      return chore.id != updatedChore.id;
    });
    newChoreList.push(updatedChore);
    const updatedChild = {
      ...props.user,
      chores: newChoreList,
    };
    props.setCurrentUser(sortChoresWithinChild(updatedChild));
  };

  const addTranscation = (newTransaction) => {
    const updatedTransactions = [...props.user.transactions, newTransaction]
    const newBalance = parseFloat(props.user.balance) + parseFloat(newTransaction.amount)
    const updatedChild = {
      ...props.user,
      transactions: updatedTransactions,
      balance: newBalance
    }
    props.setCurrentUser(updatedChild)
    console.log('child after adding transaction', props.user)
  }

  const changeQuizDate = (newQuizDate) => {
    const updatedChild = {
      ...props.user,
      quizDate: newQuizDate
    }
    props.setCurrentUser(updatedChild)
    console.log('child after updating quizdate', props.user)
  }

  
  const choreList = props.user.chores.map((chore) => {
    return <ChoreTileRegular key={chore.id} chore={chore} updateChoreState={updateChoreState} />;
  });

  // useEffect(() => {
  //   const fetchedData = async () => {
  //     const fetchedChild = await getChild();
  //     props.setCurrentUser(sortChoresWithinChild(fetchedChild));
  //   };
  //   fetchedData();
  // }, []);

  const handleQuizClick = () => {
    setShowQuiz(true)
  }

  let popOutBox = null;
  if (showQuiz) {
    popOutBox = (
      // <Quiz setCurrentUser={props.setCurrentUser} addTranscation={addTranscation} setShowQuiz={setShowQuiz} child={child} />
      <Quiz changeQuizDate={changeQuizDate} addTranscation={addTranscation} setShowQuiz={setShowQuiz} child={props.user} />
    );
  }

  console.log('child on the Dashboard ->', props.user)
  if (checkQuizEligible(props.user.quizDate)) {
    if (!quizEligible) {
      setQuizEligle(true)
    }
  }

  return (
    <div className="grid-x grid-margin-y align-center child-dash-scroll">
      <div className="cell child-dash-title">{props.user.nickname}</div>
      <div className="cell small-12 grid-x align-center">
        <span className="cell small-4 child-dash-top-left">
          {popOutBox}
          <ChildPhoto child={props.user} />
          {quizEligible ?
            <span className="button-styling" onClick={handleQuizClick}>Quiz Me!</span>
          :
            <span className="waiting-approval">Next quiz will become available 7 days after your last quiz</span>
          }
        </span>
        <span className="cell small-7 child-dash-top-right">
          <Balance child={props.user} />
        </span>
      </div>
      <div className="cell small-11 medium-9 large-8">
        <div className="chart-container">
          <div className="cell child-dash-title">Balance Over Time</div>
          <BalanceChart child={props.user} />
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
