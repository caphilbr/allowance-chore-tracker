import express from "express"
import { Family } from "../../../models/index.js"
import { ValidationError } from "objection"

const familyRouter = express.Router()

familyRouter.get("/", async (req, res) => {
  try {
    const response = await Family.query().findById(req.user.familyId)
    res.status(200).json({ family: response })
  } catch(error) {
    res.status(500).json({ error })
  }
})

familyRouter.patch("/", async (req, res) => {
  try {
    const updatedFamily = await Family.query().patchAndFetchById(req.user.familyId, { name: req.body.familyName })
    res.status(201).json({ familyName: updatedFamily.name })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      res.status(500).json({ error })
    }
  }
})


export default familyRouter