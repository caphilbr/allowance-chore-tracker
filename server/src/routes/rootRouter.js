import express from "express";

import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import childrenRouter from "./api/v1/childrenRouter.js";
import inviteRouter from "./api/v1/inviteRouter.js";
import transactionRouter from "./api/v1/transactionRouter.js";
import allowanceRouter from "./api/v1/allowanceRouter.js";
import choreRouter from "./api/v1/choreRouter.js";
import quizRouter from "./api/v1/quizRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/children", childrenRouter)
rootRouter.use("/api/v1/invite", inviteRouter)
rootRouter.use("/api/v1/transaction", transactionRouter)
rootRouter.use("/api/v1/allowance", allowanceRouter)
rootRouter.use("/api/v1/chore", choreRouter)
rootRouter.use("/api/v1/quiz", quizRouter)

export default rootRouter;
