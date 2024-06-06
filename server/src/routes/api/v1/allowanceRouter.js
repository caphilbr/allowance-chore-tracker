import express from "express"
import { Allowance } from "../../../models/index.js"
import currency from "currency.js"
import { ValidationError } from "objection"

const allowanceRouter = express.Router()

allowanceRouter.patch("/", async (req, res) => {
  try {
    const payload = {
      ...req.body,
      amount: currency(req.body.amount),
      firstDate: new Date(req.body.firstDate),
      lastDate: new Date(req.body.lastDate),
    }
    const existingAllowance = await Allowance.query().findOne({
      userId: payload.userId,
    })
    if (existingAllowance) {
      const updatedAllowance = await existingAllowance
        .$query()
        .updateAndFetch(payload)
      updatedAllowance.deletePendingAllowances()
      updatedAllowance.generatePendingAllowances()
      res.status(201).json({ allowance: updatedAllowance })
    } else {
      const newAllowance = await Allowance.query().insertAndFetch(payload)
      newAllowance.generatePendingAllowances()
      res.status(201).json({ allowance: newAllowance })
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      res.status(500).json({ error })
    }
  }
})

allowanceRouter.delete("/:id", async (req, res) => {
  try {
    const allowance = await Allowance.query().findById(req.params.id)
    await allowance.deletePendingAllowances()
    await Allowance.query().deleteById(req.params.id)
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default allowanceRouter
