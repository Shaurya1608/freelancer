import jwt from "jsonwebtoken";

export type JwtPayload = jwt.JwtPayload & {
  id: string;
  role: "client" | "freelancer" | "admin";
};

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET environment variable");
  return secret;
};

export function signJWT(payload: JwtPayload, expiresIn: string = "7d") {
  return jwt.sign(payload, getSecret(), { algorithm: "HS256", expiresIn });
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
  } catch {
    return null;
  }
}

export function getBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") return parts[1];
  return null;
}
