export const getOne = (model) => async (req, res) => {
  try {
    const doc = await model
      .findOne({ createdBy: req.user._id, _id: req.params.id })
      .lean()
      .exec();

    if (!doc) return res.status(400).json({ error: "Record not found." });

    return res.status(200).json({ data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getMany = (model) => async (req, res) => {
  try {
    const docs = await model.find({ createdBy: req.user._id }).lean().exec();

    if (!doc) return res.status(400).json({ error: "No records found." });

    return res.status(200).json({ data: docs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const createOne = (model) => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create({ ...req.body, createdBy });
    return res.status(201).json({ data: doc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          createdBy: req.user._id,
          _id: req.params.id,
        },
        req.body,
        { new: true },
      )
      .lean()
      .exec();

    if (!updatedDoc)
      return res.status(400).json({ error: "Error updating record." });

    return res.status(200).json({ data: updatedDoc });
  } catch (e) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const removeOne = (model) => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id,
    });

    if (!removed)
      return res.status(400).json({ error: "Error removing record" });

    return res.status(200).json({ data: removed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const crudControllers = (model) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
