import express from "express"
import { Allowance } from "../../../models/index.js"

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

export default transactionRouter

