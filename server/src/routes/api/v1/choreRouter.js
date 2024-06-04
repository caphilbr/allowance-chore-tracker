import express from "express"
import { Chore, Transaction } from "../../../models/index.js"
import currency from "currency.js"
import { ValidationError } from "objection"
import cleanNewChoreInput from "../../../services/cleanNewChoreInput.js"
import cleanEditChoreInput from "../../../services/cleanEditChoreInput.js"
import TransactionSerializer from "../../../serializers/TransactionSerializer.js"

const choreRouter = express.Router()

choreRouter.patch("/", async (req, res) => {
  try {
    const editedChore = cleanEditChoreInput(req.body)
    const persistedEdit = await Chore.query().patchAndFetchById(
      editedChore.id,
      editedChore,
    )
    res.status(201).json({ chore: persistedEdit })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      res.status(500).json({ error })
    }
  }
})

choreRouter.post("/", async (req, res) => {
  try {
    let newChore = cleanNewChoreInput(req.body)
    console.log('new chore to post ->', newChore)
    const persistedChore = await Chore.query().insertAndFetch(newChore)
    res.status(201).json({ chore: persistedChore })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      res.status(500).json({ error })
    }
  }
})

choreRouter.patch("/pay/:id", async (req, res) => {
  try {
    const chore = await Chore.query().findById(req.params.id)
    const newTransaction = await Transaction.query().insertAndFetch({
      amount: currency(chore.amount),
      type: `chore: ${chore.name}`,
      paymentDate: new Date(),
      userId: chore.userId,
    })
    const serializedTransaction =
      TransactionSerializer.singleTransactionForBalanceList(newTransaction)
    await Chore.query().findById(req.params.id).patch({ status: "done" })
    res.status(200).json({ transaction: serializedTransaction })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

choreRouter.patch("/submit/:id", async (req, res) => {
  try {
    const chore = await Chore.query().patchAndFetchById(req.params.id, {
      status: "pending",
    })
    res.status(200).json({ chore })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

choreRouter.delete("/:id", async (req, res) => {
  try {
    await Chore.query().deleteById(req.params.id)
    res.status(200).json({})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default choreRouter
