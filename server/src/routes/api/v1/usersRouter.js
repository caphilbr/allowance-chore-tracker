import express from "express";
import { ValidationError } from "objection";
import { User, Family } from "../../../models/index.js";
import uploadImage from "../../../services/upLoadImage.js";

const usersRouter = new express.Router();

usersRouter.post("/imageUrl/:id", uploadImage.single("image"), async (req, res) => {
  try {
    const child = await User.query().findById(req.params.id)
    const { body } = req
    const data = {
      ...body,
      image: req.file.location,
    }
    
    const updatedChildRecord = {
      ...child,
      imageUrl: data.image
    }
    await User.query().findById(req.params.id).update(updatedChildRecord)
    res.status(200).json({ imageUrl: child.imageUrl })
  } catch(error) {
    console.log(error)
  }
})


usersRouter.post("/imageUrl", uploadImage.single("image"), async (req, res) => {
  try {
    const { body } = req
    const data = {
      ...body,
      image: req.file.location,
    }
    const updatedUserRecord = {
      ...req.user,
      imageUrl: data.image
    }
    await User.query().findById(req.user.id).update(updatedUserRecord)
    res.status(200).json({ imageUrl: req.user.imageUrl })
  } catch(error) {
    console.log(error)
  }
})

usersRouter.post("/", async (req, res) => {
  // clean input service function, where we can default the imageUrl and make this below a 'const' again
  let { email, username, imageUrl, familyName, password, nickname, isParent } = req.body;
  if (imageUrl == "") {
    imageUrl = "https://allowance-chore-tracker.s3.amazonaws.com/default-profile-pic"
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
      familyId
    });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
