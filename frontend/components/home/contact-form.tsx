"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiClientError, apiClient } from "@/lib/api-client";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus({ state: "sending" });
    setFieldErrors({});
    try {
      await apiClient("/contact", { method: "POST", json: data });
      form.reset();
      setStatus({ state: "sent" });
    } catch (error) {
      if (error instanceof ApiClientError && error.details) setFieldErrors(error.details);
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-background">
        <CheckCircle2 className="h-10 w-10" />
        <p className="text-lg font-semibold">Thanks! Your message has been sent.</p>
        <Button
          variant="outline"
          className="bg-background text-foreground hover:bg-background/80"
          onClick={() => setStatus({ state: "idle" })}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4 text-left" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" error={fieldErrors.name}>
          <Input id="name" name="name" required maxLength={100} autoComplete="name" className="bg-background text-foreground" />
        </Field>
        <Field label="Email" name="email" error={fieldErrors.email}>
          <Input id="email" name="email" type="email" required autoComplete="email" className="bg-background text-foreground" />
        </Field>
      </div>
      <Field label="Message" name="message" error={fieldErrors.message}>
        <Textarea id="message" name="message" required minLength={10} maxLength={5000} rows={5} className="bg-background text-foreground" />
      </Field>

      {/* Honeypot: hidden from people, filled in by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status.state === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {status.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={status.state === "sending"}
        className="w-full gap-2 bg-background text-foreground hover:bg-background/80"
      >
        {status.state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Message
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name} className="text-background">
        {label}
      </Label>
      {children}
      {error?.[0] && <p className="text-xs text-red-400">{error[0]}</p>}
    </div>
  );
}
