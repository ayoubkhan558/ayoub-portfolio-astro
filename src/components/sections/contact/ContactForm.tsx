import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowUpRight } from "lucide-react";
import { shakeInvalidFields, stopFieldShake } from "../../effects/fieldShake";
import {
  useForm,
  type FieldPath,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

import { serviceCards } from "../../../data/serviceCatalog";

export const projectTypes = serviceCards.map((service) => service.name);

export const budgets = [
  "$100 - $499",
  "$500 - $999",
  "$1,000 - $3,000",
  "$3,000 - $7,500",
  "$7,500+",
  "Not sure yet",
];

export const timelines = [
  "ASAP",
  "2-4 weeks",
  "1-2 months",
  "Flexible / planning ahead",
];

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Please enter your name.")
    .matches(/\p{L}/u, {
      message: "Please enter a name that includes at least one letter.",
      excludeEmptyString: true,
    })
    .min(3, "Please enter at least 3 characters.")
    .max(100, "Please enter no more than 100 characters."),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  _subject: yup.string().trim().required("Please enter a subject."),
  projectType: yup
    .string()
    .oneOf(projectTypes, "Please choose a project type.")
    .required("Please choose a project type."),
  budgetRange: yup.string().defined(),
  timeline: yup.string().defined(),
  websiteUrl: yup
    .string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .url("Please enter a valid website URL (https://…).")
    .optional(),
  message: yup.string().trim().required("Please describe your project."),
});

export type ContactFormValues = yup.InferType<typeof schema>;

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
  } = useForm({
    resolver: yupResolver(schema, undefined, { mode: "sync" }),
    mode: "onChange",
    reValidateMode: "onChange",
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
    const projectSubject = params.get("subject") ?? subject;
    setValue("_subject", projectSubject);
    if (projectTypes.includes(projectSubject)) {
      setValue("projectType", projectSubject);
    }
    setValue("message", params.get("details") ?? details);
  }, [details, setValue, subject]);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const form = formRef.current;
    if (!form) throw new Error("The project brief form is unavailable.");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    setStatus({ message: "Sending your project brief…", error: false });

    try {
      const formData = new FormData(form);
      for (const field of contactFields) {
        const value = data[field];
        if (value === undefined) {
          formData.delete(field);
        } else {
          formData.set(field, value);
        }
      }

      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        errors?: { field?: string; message?: string }[];
      };

      if (!response.ok || payload.ok === false) {
        const invalidFields: string[] = [];
        for (const item of payload.errors ?? []) {
          if (item.field && isContactField(item.field)) {
            invalidFields.push(item.field);
            setError(item.field, {
              type: "server",
              message: item.message || "Please check this field.",
            });
          }
        }
        shakeInvalidFields(form, invalidFields);
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
  };

  const onInvalid: SubmitErrorHandler<ContactFormValues> = (invalid) => {
    setStatus({
      message: "Please correct the highlighted fields and try again.",
      error: true,
    });
    shakeInvalidFields(formRef.current, Object.keys(invalid));
  };

  function onChange(event: ChangeEvent<HTMLFormElement>) {
    const field = event.target;
    if (
      (field instanceof HTMLInputElement ||
        field instanceof HTMLSelectElement ||
        field instanceof HTMLTextAreaElement) &&
      isContactField(field.name)
    ) {
      stopFieldShake(field);
      if (status?.error) setStatus(null);
    }
  }

  function showFieldError(
    field: FieldPath<ContactFormValues>,
    message?: string,
  ) {
    return (
      <span className="field-error" role="status" aria-atomic="true" id={`error-${field}`}>
        {message}
      </span>
    );
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      ref={formRef}
      method="POST"
      action={action}
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onChange={onChange}
      aria-busy={isSubmitting}
    >
      <span className="eyebrow">Project brief</span>
      <h2 className="contact-form__title">What to send.</h2>
      <p className="contact-form__description">
        Give me enough context to price the next step without a long discovery
        call.
      </p>
      {/* <div
        className={`form-message${status?.error ? " error" : ""}`}
        id="form-message"
        role={status?.error ? "alert" : "status"}
        aria-live={status?.error ? "assertive" : "polite"}
        tabIndex={-1}
        hidden={!status}
      >
        {status?.message}
      </div> */}
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
          <select className="contact-form__select portfolio__select" {...register("budgetRange")}
            aria-invalid={Boolean(errors.budgetRange)}
            aria-describedby={errors.budgetRange ? "error-budgetRange" : undefined}
          >
            <option value="">Choose one</option>
            {budgets.map((budget) => <option key={budget}>{budget}</option>)}
          </select>
          {showFieldError("budgetRange", errors.budgetRange?.message)}
        </label>
        <label className="form-field">
          Timeline
          <select className="contact-form__select portfolio__select" {...register("timeline")}
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? "error-timeline" : undefined}
          >
            <option value="">Choose one</option>
            {timelines.map((timeline) => <option key={timeline}>{timeline}</option>)}
          </select>
          {showFieldError("timeline", errors.timeline?.message)}
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
