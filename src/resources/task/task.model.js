import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "complete", "pastdue"],
      default: "active",
    },
    notes: String,
    due: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "list",
      required: true,
    },
  },
  { timestamps: true },
);

taskSchema.index({ user: 1, list: 1 }, { unique: true });

export const Task = mongoose.model("task", taskSchema);
