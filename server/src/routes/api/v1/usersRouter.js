import express from "express";
import { ValidationError } from "objection";
import { User } from "../../../models/index.js";
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
  const { email, password } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password });
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
