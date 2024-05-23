import express from "express"
import { Transaction } from "../../../models/index.js"
import cleanNewTransactionInput from "./../../../services/cleanNewTransactionInput.js"

const transactionRouter = new express.Router()

transactionRouter.post("/", async (req, res) => {
  try {
    let newTransaction = cleanNewTransactionInput(req.body);
    const persistedTransaction = await Transaction.query().insertAndFetch(newTransaction);
    res.status(201).json({ transaction: persistedTransaction });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data });
    } else {
      console.log(error);
      res.status(500).json({ error });
    }
  }
});

export default transactionRouter

