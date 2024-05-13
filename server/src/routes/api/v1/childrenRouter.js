import express from "express";
import { Family } from "./../../../models/index.js"

const childrenRouter = new express.Router();

childrenRouter.get("/", async (req, res) => {
  try {
    const family = await Family.query().findById(req.user.familyId)
    const children = await family.children()
    // serializers are needed here
    res.status(200).json({ children })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

export default childrenRouter;