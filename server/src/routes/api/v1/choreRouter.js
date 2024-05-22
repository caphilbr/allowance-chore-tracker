import express from "express";
import { Chore, Transaction } from "../../../models/index.js";
import currency from "currency.js";
import { ValidationError } from "objection";
import cleanNewChoreInput from "../../../services/cleanNewChoreInput.js";

const choreRouter = express.Router()

choreRouter.post("/", async (req, res) => {
  try {
    let newChore = cleanNewChoreInput(req.body)
    const persistedChore = await Chore.query().insertAndFetch(newChore)
    res.status(201).json({ chore: persistedChore })
  } catch(error) {
    if (error instanceof ValidationError) {
      res.status(422).json( {errors: error.data })
    } else {
      console.log(error)
      res.status(500).json( { error } )
    }
  }
})

choreRouter.patch("/pay/:id", async (req, res) => {
  try {
    const chore = await Chore.query().findById(req.params.id)
    await Transaction.query().insertAndFetch({
      amount: currency(chore.amount),
      type: `chore: ${chore.name}`,
      paymentDate: new Date(),
      userId: chore.userId
    })
    await Chore.query().findById(req.params.id).patch({ isComplete: true, status: "done" })
    res.status(200).json({})

  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

choreRouter.patch("/submit/:id", async (req, res) => {
  try {
    const chore = await Chore.query().patchAndFetchById(req.params.id, { status: "pending" })
    res.status(200).json({ chore })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

choreRouter.delete("/:id", async (req, res) => {
  try {
    // const allowance = await Allowance.query().findById(req.params.id)
    // await allowance.deletePendingAllowances()
    // await Allowance.query().deleteById(req.params.id)
    // res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})


export default choreRouter