import currency from "currency.js";

const cleanNewTransactionInput = (inputObject) => {
  const cleanInput = {};
  Object.keys(inputObject).forEach((key) => {
    if (key == "amount") {
      cleanInput[key] = currency(inputObject[key]);
    } else if (key == "paymentDate") {
        cleanInput[key] = new Date(inputObject[key]);
    } else if (inputObject[key] != "") {
      cleanInput[key] = inputObject[key];
    }
  });
  return cleanInput;
};

export default cleanNewTransactionInput;
