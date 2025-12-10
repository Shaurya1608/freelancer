import { Schema, models, model, type InferSchemaType } from "mongoose";

export const ProjectSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    budgetMin: { type: Number, required: true },
    budgetMax: { type: Number, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["open", "in_progress", "completed"], default: "open" },
  },
  { timestamps: true }
);

export type ProjectDoc = InferSchemaType<typeof ProjectSchema> & { _id: string };

export const ProjectModel = models.Project || model("Project", ProjectSchema);
