import express from "express";
import emailInvite from "../../../services/emailInvite.js"
import emailInvite2 from "../../../services/emailInvite2.js";

const emailRouter = express.Router()

emailRouter.post("/", async (req, res) => {
  const { email, inviteUrl } = req.body
  try {
    // await emailInvite(email, inviteUrl)
    await emailInvite2(email, inviteUrl)
    // const response = await emailInvite(email, inviteUrl).catch(() => {
    //   const newError = new Error(response.message)
    //   throw(newError)
    // })
    // console.log("response: ", response)
    res.status(200).json({})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

export default emailRouter