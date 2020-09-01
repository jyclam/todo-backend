import { crudControllers } from "../../utils/crud";
import { Task } from "./task.model";

const createOne = async (req, res) => {
  const createdBy = req.user._id;
  const listId = req.body.listId;

  if (!listId) return res.status(400).json({ error: "ListId required." });

  try {
    const doc = await Task.create({ ...req.body, createdBy, list: listId });
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default {
  ...crudControllers(Task),
  createOne,
};
