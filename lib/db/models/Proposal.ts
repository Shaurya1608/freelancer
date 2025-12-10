import { Schema, models, model, type InferSchemaType } from "mongoose";

export const ProposalSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    freelancerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String, required: true },
    bid: { type: Number, required: true },
    timeline: { type: String, required: true },
    status: { type: String, enum: ["submitted", "shortlisted", "accepted", "rejected"], default: "submitted" },
  },
  { timestamps: true }
);

export type ProposalDoc = InferSchemaType<typeof ProposalSchema> & { _id: string };

export const ProposalModel = models.Proposal || model("Proposal", ProposalSchema);
