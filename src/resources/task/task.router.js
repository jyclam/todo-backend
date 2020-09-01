import { Router } from "express";
import controllers from "./task.controllers";

const router = Router();

// prettier-ignore
router.route("/")
.get(controllers.getMany)
.post(controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
