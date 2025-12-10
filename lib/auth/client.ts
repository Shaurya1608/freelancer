export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "client" | "freelancer" | "admin";
};

export type AuthResponse =
  | { token: string; user: AuthUser }
  | { error: string };

const TOKEN_KEY = "auth.token";

export function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export async function authFetch(input: RequestInfo | URL, init?: RequestInit) {
  const token = getToken();
  const headers: HeadersInit = {
    ...(init?.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };
  return fetch(input, { ...init, headers });
}
