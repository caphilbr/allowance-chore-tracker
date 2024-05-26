import express from "express"
import Invite from "../../../models/Invite.js"
import createCode from "../../../services/createCode.js"

const inviteRouter = express.Router()

inviteRouter.post("/email", async (req, res) => {
  const { email, nickname } = req.body
  try {
    const newInvite = {
      email: email,
      nickname: nickname,
      code: createCode(),
      wasAccepted: false,
      familyId: req.user.familyId,
    }
    const invite = await Invite.query().insertAndFetch(newInvite)
    const response = await invite.sendInvite()
    if (!response.success) {
      const newError = new Error(response.errorMessage)
      throw newError
    }
    res.status(200).json({})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

inviteRouter.get("/:code", async (req, res) => {
  const code = req.params.code
  let errorStatus = null
  try {
    const invite = await Invite.query().findOne({ code })
    if (!invite) {
      const newError = new Error("Could not find invite code")
      errorStatus = 404
      throw newError
    }
    if (invite.wasAccepted) {
      const newError = new Error("Invite already accepted")
      errorStatus = 403
      throw newError
    }
    res.status(200).json({ invite })
  } catch (error) {
    if (!errorStatus) {
      errorStatus = 500
    }
    res.status(errorStatus).json({ error })
  }
})

export default inviteRouter
