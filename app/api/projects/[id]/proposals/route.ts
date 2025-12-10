import { NextResponse } from "next/server";
import { getDbConnection } from "@/lib/db/mongoose";
import { ProposalModel } from "@/lib/db/models/Proposal";
import { getBearerToken, verifyJWT } from "@/lib/auth/jwt";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  try {
    await getDbConnection();
    const list = await ProposalModel.find({ projectId: params.id }).sort({ createdAt: -1 });
    return NextResponse.json(list, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: Params) {
  try {
    await getDbConnection();
    const token = getBearerToken(req.headers.get("authorization"));
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const payload = verifyJWT(token);
    if (!payload || payload.role !== "freelancer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = (await req.json()) as {
      coverLetter: string;
      bid: number;
      timeline: string;
    };
    if (!body.coverLetter || !body.bid || !body.timeline) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const pr = await ProposalModel.create({
      projectId: params.id,
      freelancerId: payload.id,
      coverLetter: body.coverLetter,
      bid: Number(body.bid),
      timeline: body.timeline,
      status: "submitted",
    });

    return NextResponse.json(pr, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
