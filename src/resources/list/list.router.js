import { Router } from "express";
import controllers from "./list.controllers";

const router = Router();

// prettier-ignore
router.route("/")
.get(controllers.getOne)
.post(controllers.createOne);

router
  .route("/:id")
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
