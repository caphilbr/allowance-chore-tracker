import express from "express"
import { ValidationError } from "objection"
import { User, Family, Invite } from "../../../models/index.js"
import uploadImage from "../../../services/upLoadImage.js"
import config from "../../../config.js"

const usersRouter = new express.Router()

usersRouter.patch("/", async (req, res) => {
  try {
    let updatedUser = req.user
    Object.keys(req.body).forEach((key) => {
      updatedUser = {
        ...updatedUser,
        [key]: req.body[key],
      }
    })

    const persistedUser = await User.query().updateAndFetchById(
      updatedUser.id,
      updatedUser,
    )
    res.status(200).json({ user: persistedUser })
  } catch (error) {
    console.log(error)
    if (error instanceof ValidationError) {
      res.status(422).json({ errors: error.data })
    } else {
      console.log(error)
      res.status(500).json({ error })
    }
  }
})

usersRouter.post(
  "/imageUrl/:id",
  uploadImage.single("image"),
  async (req, res) => {
    try {
      const child = await User.query().findById(req.params.id)
      const { body } = req
      const data = {
        ...body,
        image: req.file.location,
      }

      const updatedChildRecord = {
        ...child,
        imageUrl: data.image,
      }
      await User.query().findById(req.params.id).update(updatedChildRecord)
      res.status(200).json({ imageUrl: child.imageUrl })
    } catch (error) {
      console.log(error)
    }
  },
)

usersRouter.post("/imageUrl", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    const data = {
      ...body,
      image: req.file.location,
    }
    const updatedUserRecord = {
      ...req.user,
      imageUrl: data.image,
    }
    await User.query().findById(req.user.id).update(updatedUserRecord)
    res.status(200).json({ imageUrl: req.user.imageUrl })
  } catch (error) {
    console.log(error)
  }
})

usersRouter.post("/child", async (req, res) => {
  const { inviteId } = req.body
  let childPayload = req.body
  delete childPayload.passwordConfirmation
  delete childPayload.inviteId
  if (childPayload.imageUrl == "") {
    childPayload.imageUrl = config.defaultProfilePic
  }
  try {
    const persistedUser = await User.query().insertAndFetch(childPayload)
    const invite = await Invite.query()
      .findById(inviteId)
      .patch({ wasAccepted: true })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error.message })
  }
})

usersRouter.post("/", async (req, res) => {
  let { email, username, imageUrl, familyName, password, nickname, isParent } =
    req.body
  if (imageUrl == "") {
    imageUrl = config.defaultProfilePic
  }
  try {
    const newFamily = await Family.query().insertAndFetch({ name: familyName })
    const familyId = newFamily.id
    const persistedUser = await User.query().insertAndFetch({
      email,
      username,
      imageUrl,
      familyId,
      password,
      nickname,
      isParent,
      familyId,
    })
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser })
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ error: error.message })
  }
})

export default usersRouter
