import { Schema, models, model, type InferSchemaType } from "mongoose";

export const MessageSchema = new Schema(
  {
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

export type MessageDoc = InferSchemaType<typeof MessageSchema> & { _id: string };

export const MessageModel = models.Message || model("Message", MessageSchema);
