"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import {
  getConversationsForUser,
  getCurrentUser,
  getMessages,
  getUserById,
  sendMessage,
  type Conversation,
  type Message,
} from "@/lib/demo";

export default function MessagesPage() {
  const me = getCurrentUser("freelancer"); // demo: act as a freelancer
  const search = useSearchParams();
  const preselect = search.get("c");
  const convs = getConversationsForUser(me.id).sort((a, b) =>
    b.lastMessageAt.localeCompare(a.lastMessageAt)
  );
  const [active, setActive] = useState<Conversation | null>(
    convs.find((c) => c.id === preselect) ?? convs[0] ?? null
  );
  const [input, setInput] = useState("");

  const messages = useMemo<Message[]>(() => {
    if (!active) return [];
    return getMessages(active.id);
  }, [active]);

  const other = (c: Conversation | null) => {
    if (!c) return null;
    const id = c.participants.find((p) => p !== me.id);
    return id ? getUserById(id) : null;
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 md:py-14">
      <Reveal>
        <h1 className="text-3xl font-semibold">Messages</h1>
      </Reveal>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
          <div className="mb-2 text-sm font-semibold">Conversations</div>
          <ul className="space-y-2">
            {convs.map((c) => {
              const o = other(c);
              const selected = active?.id === c.id;
              return (
                <li key={c.id}>
                  <button
                    className={[
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      selected
                        ? "bg-blue-50 text-blue-900 ring-1 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-200 dark:ring-blue-500/30"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800",
                    ].join(" ")}
                    onClick={() => setActive(c)}
                  >
                    <div className="font-medium">{o?.name ?? "Unknown"}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(c.lastMessageAt).toLocaleString()}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="flex h-[60vh] flex-col rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="border-b border-gray-200 p-3 dark:border-gray-800">
              <div className="text-sm">
                Chat with <span className="font-medium">{other(active)?.name ?? "—"}</span>
              </div>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-3">
              {messages.map((m) => {
                const mine = m.senderId === me.id;
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={[
                        "max-w-[70%] rounded-2xl px-3 py-2 text-sm",
                        mine
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                      ].join(" ")}
                    >
                      <div>{m.body}</div>
                      <div className={`mt-1 text-[10px] ${mine ? "text-white/80" : "text-gray-500"}`}>
                        {new Date(m.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <form
              className="flex gap-2 border-t border-gray-200 p-3 dark:border-gray-800"
              onSubmit={(e) => {
                e.preventDefault();
                if (!active || !input.trim()) return;
                sendMessage(active.id, me.id, input.trim());
                setInput("");
              }}
            >
              <input
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
              <button
                type="submit"
                className="btn-press inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white ring-1 ring-blue-500/50 transition hover:bg-blue-500"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
