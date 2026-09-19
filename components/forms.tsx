"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "./icons";

type DemoFormProps = { mode?: "demo" | "contact" };

type FormState = { status: "idle" | "submitting" | "success" | "error"; message?: string };

const initialState: FormState = { status: "idle" };

export function DemoForm({ mode = "demo" }: DemoFormProps) {
  const [state, setState] = useState<FormState>(initialState);
  const isContact = mode === "contact";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, formType: mode }),
      });
      const result = (await response.json()) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "We could not process this request.");
      form.reset();
      setState({ status: "success", message: result.message });
    } catch (error) {
      setState({ status: "error", message: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    }
  }

  if (state.status === "success") {
    return <div className="form-result success" role="status" aria-live="polite"><div className="result-icon"><Check /></div><h2>{isContact ? "Message ready to continue." : "Request received."}</h2><p>{state.message || "Thanks. Your request has been accepted by the configured contact workflow."}</p><button className="btn outline" type="button" onClick={() => setState(initialState)}>Send another request</button></div>;
  }

  return <form className="lead-form" onSubmit={submit} autoComplete="on">
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <div className="form-grid two">
      <Field name="name" label="Name" required placeholder="Your name" />
      <Field name="organization" label="Organization" required placeholder="Company or organization" />
    </div>
    {isContact ? <>
      <div className="form-grid two">
        <Field name="email" label="Email" type="email" required placeholder="you@example.com" />
        <Field name="phone" label="Phone" placeholder="Optional" />
      </div>
      <Field name="subject" label="Subject" required placeholder="How can we help?" />
      <TextArea name="message" label="Message" required placeholder="Tell us what you would like to discuss." />
    </> : <>
      <div className="form-grid two">
        <Field name="propertyName" label="Property Name" required placeholder="Property name" />
        <Select name="propertyType" label="Property Type" required options={["Hotel", "Resort", "Boutique Property", "Guest House", "Serviced Apartment", "Other"]} />
      </div>
      <div className="form-grid two">
        <Field name="rooms" label="Number of Rooms" type="number" min="1" required placeholder="e.g. 40" />
        <Field name="email" label="Email" type="email" required placeholder="you@example.com" />
      </div>
      <Field name="phone" label="Phone" required placeholder="Phone number" />
      <TextArea name="message" label="Message" placeholder="Tell us about your property or what you want to explore." />
    </>}
    {state.status === "error" && <p className="form-error" role="alert" aria-live="assertive">{state.message}</p>}
    <div className="form-submit-row"><button className="btn primary large" type="submit" disabled={state.status === "submitting"}>{state.status === "submitting" ? "Sending…" : isContact ? "Send Message" : "Request a Demo"} <ArrowRight /></button><small>We only use the information submitted here to respond to this request. Submission requires a configured lead endpoint.</small></div>
  </form>;
}

function Field({ name, label, type = "text", required = false, placeholder, min }: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; min?: string }) {
  return <label className="form-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span><input name={name} type={type} min={min} required={required} placeholder={placeholder} /></label>;
}
function Select({ name, label, required, options }: { name: string; label: string; required?: boolean; options: string[] }) {
  return <label className="form-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span><select name={name} required={required}><option value="">Select one</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></label>;
}
function TextArea({ name, label, required = false, placeholder }: { name: string; label: string; required?: boolean; placeholder?: string }) {
  return <label className="form-field"><span>{label}{required && <b aria-hidden="true"> *</b>}</span><textarea name={name} rows={6} required={required} placeholder={placeholder} /></label>;
}
