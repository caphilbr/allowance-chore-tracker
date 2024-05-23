import express from "express";
import passport from "passport";
import ChildrenSerializer from "./../../../serializers/ChildrenSerializer.js"
import Allowance from "../../../models/Allowance.js";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json({
      message:
        "Either name or password are incorrect. Please try again, or Sign Up to create a new account.",
    });
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    try {
      const family = await (req.user).$relatedQuery("family")
      await Allowance.processPendingAllowances(family.id)
      if (!(req.user.isParent)) {
        const child = await ChildrenSerializer.fullChildUser(req.user);
        console.log('child is ', child)
        res.status(200).json(child);
      }
      console.log('req.user is ', req.user)
      res.status(200).json(req.user);
    } catch(error) {
      console.log('uanble to update pending allowances (or perhaps get the child details)', error.message)
      res.status(500).json({ error })
    }
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;
