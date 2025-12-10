import { Schema, models, model, type InferSchemaType } from "mongoose";

export const ConversationSchema = new Schema(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type ConversationDoc = InferSchemaType<typeof ConversationSchema> & { _id: string };

export const ConversationModel = models.Conversation || model("Conversation", ConversationSchema);
