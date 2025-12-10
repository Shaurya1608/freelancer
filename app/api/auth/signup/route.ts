import { NextResponse } from "next/server";
import { getDbConnection } from "@/lib/db/mongoose";
import { UserModel } from "@/lib/db/models/User";
import { getBearerToken, verifyJWT } from "@/lib/auth/jwt";

export async function GET(req: Request) {
  try {
    await getDbConnection();
    const token = getBearerToken(req.headers.get("authorization"));
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyJWT(token);
    if (!payload) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const user = await UserModel.findById(payload.id);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(
      {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
