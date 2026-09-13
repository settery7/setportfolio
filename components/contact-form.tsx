"use client";

/* docs/build-spec.md §10. Client-side validation before submit, inline errors
   that say what to fix, a disabled state while sending, and a success state
   that replaces the form rather than a toast that disappears.

   The honeypot field is required: never post a raw form to a third party
   without one. */

import { useState } from "react";
import { identity } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "error";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = "Tell me who you are.";
    if (!email) next.email = "I need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "That address is missing an @ or a domain.";
    if (!message) next.message = "Say what you would like to talk about.";
    else if (message.length < 10) next.message = "A little more detail helps.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setFailure(
        "The form is not configured yet — NEXT_PUBLIC_WEB3FORMS_KEY is missing.",
      );
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio message from ${name}`,
          name,
          email,
          message,
          botcheck: data.get("botcheck") ?? "",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message ?? "Web3Forms rejected the submission.");
      }
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setFailure(
        error instanceof Error
          ? error.message
          : "Something went wrong sending that.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-signal bg-surface/40 p-8">
        <h2 className="font-display text-xl font-semibold">Message sent.</h2>
        <p className="measure mt-2 text-muted">
          It is in my inbox. I will reply to the address you gave me.
        </p>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded border border-edge bg-surface/40 px-3 py-2 outline-none focus:border-signal";

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      {/* Honeypot. Hidden from people, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="block">
        <span className="text-sm">Name</span>
        <input name="name" type="text" autoComplete="name" className={field} />
        {errors.name ? (
          <span className="mt-1 block text-sm text-signal">{errors.name}</span>
        ) : null}
      </label>

      <label className="mt-5 block">
        <span className="text-sm">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={field}
        />
        {errors.email ? (
          <span className="mt-1 block text-sm text-signal">{errors.email}</span>
        ) : null}
      </label>

      <label className="mt-5 block">
        <span className="text-sm">Message</span>
        <textarea name="message" rows={6} className={field} />
        {errors.message ? (
          <span className="mt-1 block text-sm text-signal">
            {errors.message}
          </span>
        ) : null}
      </label>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-signal">
          {failure} You can email me directly at {identity.email}.
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="press rounded-full bg-signal px-5 py-2.5 font-semibold text-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(identity.email);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            } catch {
              setCopied(false);
            }
          }}
          className="press rounded-full border border-edge px-5 py-2.5 hover:border-sand"
        >
          {copied ? "Copied" : "Copy email"}
        </button>
      </div>
    </form>
  );
}
