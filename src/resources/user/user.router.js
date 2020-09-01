import { Router } from "express";
import { get } from "./user.controllers";

const router = Router();

router.get("/", get);

export default router;
