import express from "express"
import { Allowance, Transaction } from "../../../models/index.js"
import cleanNewTransactionInput from "./../../../services/cleanNewTransactionInput.js"

const transactionRouter = new express.Router()

transactionRouter.get("/", async (req, res) => {
  try {
    const family = await (req.user).$relatedQuery("family")
    await Allowance.processPendingAllowances(family.id)
    res.status(200).json({})
  } catch(error) {
    res.status(500).json({ error })
  }
})

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

