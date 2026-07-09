"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: String(fd.get("subject") || "").trim() || undefined,
      message: String(fd.get("message") || "").trim(),
    };
    try {
      await api("/api/contact/messages", { method: "POST", json: payload });
      (e.target as HTMLFormElement).reset();
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-3xl p-6 space-y-3">
      <h3 className="heading text-lg">Send a message</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Name</label>
          <input required name="name" className="input" placeholder="Sakura" />
        </div>
        <div>
          <label className="label">Email</label>
          <input
            required
            type="email"
            name="email"
            className="input"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="label">Subject</label>
        <input name="subject" className="input" placeholder="A soft hello" />
      </div>
      <div>
        <label className="label">Message</label>
        <textarea
          required
          name="message"
          rows={5}
          className="input resize-y"
          placeholder="Tell me anything ✿"
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          disabled={state === "sending"}
          type="submit"
          className="btn-primary"
        >
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "sent" && (
          <span className="text-sm text-sakura-600 dark:text-sakura-300">
            ✿ Sent — thank you!
          </span>
        )}
        {state === "error" && (
          <span className="text-sm text-red-500">{error}</span>
        )}
      </div>
    </form>
  );
}
