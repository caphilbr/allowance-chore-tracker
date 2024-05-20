import express from "express";

import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import childrenRouter from "./api/v1/childrenRouter.js";
import inviteRouter from "./api/v1/inviteRouter.js";
import transactionRouter from "./api/v1/transactionRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/children", childrenRouter)
rootRouter.use("/api/v1/invite", inviteRouter)
rootRouter.use("/api/v1/transaction", transactionRouter)

export default rootRouter;
