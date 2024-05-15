import express from "express";
import { Family } from "./../../../models/index.js"
import ChildrenSerializer from "../../../serializers/ChildrenSerializer.js";
import ChoreSerializer from "../../../serializers/ChoreSerializer.js";

const childrenRouter = new express.Router();

childrenRouter.get("/current", async (req, res) => {
  try {
    const child = req.user
    /////////
    // serialize the Child here
    /////////
    child.chores = await ChoreSerializer.dashboard(child)
    res.status(200).json({ child })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
})

childrenRouter.get("/", async (req, res) => {
  try {
    const family = await Family.query().findById(req.user.familyId)
    const children = await family.children()
    const serializedChildren = await ChildrenSerializer.parentDashboardList(children)
    
    res.status(200).json({ children: serializedChildren })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
});

export default childrenRouter;