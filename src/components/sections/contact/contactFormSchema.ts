import * as yup from "yup";

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

export const contactFormSchema = yup.object({
  name: yup.string().trim().required("Please enter your name."),
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

export type ContactFormValues = yup.InferType<typeof contactFormSchema>;
