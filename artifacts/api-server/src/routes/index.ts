import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import foodsRouter from "./foods";
import ordersRouter from "./orders";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(foodsRouter);
router.use(ordersRouter);

export default router;
