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

const getMany = async (req, res) => {
  const listId = req.query.listId;

  if (!listId) return res.status(400).json({ error: "ListId required." });

  try {
    const docs = await Task.find({
      createdBy: req.user._id,
      list: req.query.listId,
    })
      .lean()
      .exec();

    if (!docs) return res.status(400).json({ error: "No records found." });

    return res.status(200).json({ data: docs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export default {
  ...crudControllers(Task),
  createOne,
  getMany,
};
