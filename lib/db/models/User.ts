import { Schema, models, model, type InferSchemaType } from "mongoose";

export const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["client", "freelancer", "admin"], required: true },
    avatar: { type: String },
    headline: { type: String },
    skills: { type: [String], default: [] },
    rating: { type: Number, min: 0, max: 5 },
    bio: { type: String },
    hourlyRate: { type: Number },
    availability: { type: String, enum: ["full-time", "part-time", "contract"] },
    company: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema> & { _id: string };

export const UserModel = models.User || model("User", UserSchema);
