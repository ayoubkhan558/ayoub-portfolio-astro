import { useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowUpRight } from "lucide-react";
import { useForm, type FieldPath } from "react-hook-form";

import {
  budgets,
  contactFormSchema,
  projectTypes,
  timelines,
  type ContactFormValues,
} from "./contactFormSchema";

type Props = {
  action: string;
  email: string;
  subject: string;
  details: string;
};

const contactFields = [
  "name",
  "email",
  "_subject",
  "projectType",
  "budgetRange",
  "timeline",
  "websiteUrl",
  "message",
] as const satisfies readonly FieldPath<ContactFormValues>[];

function isContactField(value: string): value is FieldPath<ContactFormValues> {
  return contactFields.includes(value as FieldPath<ContactFormValues>);
}

export default function ContactForm({
  action,
  email,
  subject,
  details,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      _subject: subject,
      projectType: "",
      budgetRange: "",
      timeline: "",
      websiteUrl: "",
      message: details,
    },
  });
  useEffect(() => {
    formRef.current?.setAttribute("novalidate", "");
    const params = new URLSearchParams(window.location.search);
    setValue("_subject", params.get("subject") ?? subject);
    setValue("message", params.get("details") ?? details);
  }, [details, setValue, subject]);

  async function submitForm() {
    const form = formRef.current;
    if (!form) throw new Error("The project brief form is unavailable.");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setStatus({ message: "Sending your project brief…", error: false });

    try {
      const response = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: { field?: string; message?: string }[];
      };

      if (!response.ok || payload.ok === false) {
        for (const item of payload.errors ?? []) {
          if (item.field && isContactField(item.field)) {
            setError(item.field, {
              type: "server",
              message: item.message || "Please check this field.",
            });
          }
        }
        throw new Error(
          payload.errors?.map((item) => item.message).filter(Boolean).join(" ") ||
            "Please try again or use the direct email link above.",
        );
      }

      reset({
        name: "",
        email: "",
        _subject: "",
        projectType: "",
        budgetRange: "",
        timeline: "",
        websiteUrl: "",
        message: "",
      });
      setStatus({
        message:
          "Thanks. Your project brief has been sent. I'll review it and reply with the next practical step.",
        error: false,
      });
    } catch (error) {
      const detail = controller.signal.aborted
        ? "Sending took too long."
        : error instanceof TypeError
          ? "Check your internet connection and try again."
          : error instanceof SyntaxError
            ? "The response could not be read. Please try again."
            : error instanceof Error
              ? error.message
              : "Please try again.";
      setStatus({
        message: `The brief could not be sent. ${detail} Your details are still here. You can also use the direct email link above.`,
        error: true,
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function showFieldError(
    field: FieldPath<ContactFormValues>,
    message?: string,
  ) {
    return message ? (
      <span className="field-error" id={`error-${field}`}>
        {message}
      </span>
    ) : null;
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      ref={formRef}
      method="POST"
      action={action}
      onSubmit={(event) => {
        formRef.current?.setAttribute("novalidate", "");
        void handleSubmit(submitForm)(event);
      }}
      aria-busy={isSubmitting}
    >
      <span className="eyebrow">Project brief</span>
      <h2 className="contact-form__title">What to send.</h2>
      <p className="contact-form__description">
        Give me enough context to price the next step without a long discovery
        call.
      </p>
      <div
        className={`form-message${status?.error ? " error" : ""}`}
        id="form-message"
        role={status?.error ? "alert" : "status"}
        aria-live={status?.error ? "assertive" : "polite"}
        tabIndex={-1}
        hidden={!status}
      >
        {status?.message}
      </div>
      <div className="form-grid">
        <label className="form-field">
          Name
          <input className="contact-form__input portfolio__input"
            {...register("name")}
            autoComplete="name"
            placeholder="Your name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "error-name" : undefined}
          />
          {showFieldError("name", errors.name?.message)}
        </label>
        <label className="form-field">
          Email
          <input className="contact-form__input portfolio__input"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
          />
          {showFieldError("email", errors.email?.message)}
        </label>
      </div>
      <label className="form-field">
        Subject
        <input className="contact-form__input portfolio__input"
          {...register("_subject")}
          placeholder="Website build estimate"
          required
          aria-invalid={Boolean(errors._subject)}
          aria-describedby={errors._subject ? "error-_subject" : undefined}
        />
        {showFieldError("_subject", errors._subject?.message)}
      </label>
      <label className="form-field">
        Project type
        <select className="contact-form__select portfolio__select"
          {...register("projectType")}
          required
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={errors.projectType ? "error-projectType" : undefined}
        >
          <option value="">Choose one</option>
          {projectTypes.map((type) => <option key={type}>{type}</option>)}
        </select>
        {showFieldError("projectType", errors.projectType?.message)}
      </label>
      <div className="form-grid contact-form__additional-fields">
        <label className="form-field">
          Budget range
          <select className="contact-form__select portfolio__select" {...register("budgetRange")}>
            <option value="">Choose one</option>
            {budgets.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
        </label>
        <label className="form-field">
          Timeline
          <select className="contact-form__select portfolio__select" {...register("timeline")}>
            <option value="">Choose one</option>
            {timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
          </select>
        </label>
      </div>
      <label className="form-field">
        Website or reference link
        <input className="contact-form__input portfolio__input"
          {...register("websiteUrl")}
          type="url"
          placeholder="https://"
          aria-invalid={Boolean(errors.websiteUrl)}
          aria-describedby={errors.websiteUrl ? "error-websiteUrl" : undefined}
        />
        {showFieldError("websiteUrl", errors.websiteUrl?.message)}
      </label>
      <label className="form-field">
        Project details
        <textarea className="contact-form__message portfolio__textarea"
          {...register("message")}
          required
          placeholder="Your goals, current blockers, reference links, and what success looks like…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "error-message" : undefined}
        />
        {showFieldError("message", errors.message?.message)}
      </label>
      <input
        className="contact-honeypot contact-form__input portfolio__input"
        name="_gotcha"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      <button className="button portfolio__button" type="submit" id="send-brief" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send project brief"}
        <ArrowUpRight className="button__icon" aria-hidden="true" size={18} />
      </button>
      <p className="consent contact-form__description">
        By submitting, you agree to the{" "}
        <a className="consent__link" href="/privacy-policy/">privacy policy</a>. Prefer email?{" "}
        <a className="consent__link" href={`mailto:${email}`}>Write directly</a>.
      </p>
    </form>
  );
}
