import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDbConnection } from "@/lib/db/mongoose";
import { UserModel } from "@/lib/db/models/User";
import { signJWT } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    await getDbConnection();
    const body = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      role: "client" | "freelancer" | "admin";
    };

    if (!body?.name || !body?.email || !body?.password || !body?.role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    if (!["client", "freelancer", "admin"].includes(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existing = await UserModel.findOne({ email: body.email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hash = await bcrypt.hash(body.password, 10);
    const user = await UserModel.create({
      name: body.name,
      email: body.email,
      passwordHash: hash,
      role: body.role,
    });

    const token = signJWT({ id: String(user._id), role: user.role });
    const safeUser = {
      id: String(user._id),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    return NextResponse.json({ token, user: safeUser }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
