import { NextResponse } from "next/server";
import { getDbConnection } from "@/lib/db/mongoose";
import { ConversationModel } from "@/lib/db/models/Conversation";
import { MessageModel } from "@/lib/db/models/Message";
import { getBearerToken, verifyJWT } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  try {
    await getDbConnection();
    const token = getBearerToken(req.headers.get("authorization"));
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = verifyJWT(token);
    if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const convs = await ConversationModel.find({ participants: payload.id })
      .sort({ lastMessageAt: -1 })
      .lean();

    return NextResponse.json(convs, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await getDbConnection();
    const token = getBearerToken(req.headers.get("authorization"));
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = verifyJWT(token);
    if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const body = (await req.json()) as { to: string; body: string };
    if (!body?.to || !body?.body) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    let conv = await ConversationModel.findOne({
      participants: { $all: [payload.id, body.to] },
    });
    if (!conv) {
      conv = await ConversationModel.create({
        participants: [payload.id, body.to],
        lastMessageAt: new Date(),
      });
    }

    const msg = await MessageModel.create({
      conversationId: conv._id,
      senderId: payload.id,
      body: body.body,
    });

    await ConversationModel.updateOne({ _id: conv._id }, { $set: { lastMessageAt: new Date() } });

    return NextResponse.json(msg, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
