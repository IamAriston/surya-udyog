import { z } from "zod";

const REGEX = {
  numbersOnly: /^[0-9]+$/,
  floatNumbersOnly: /^-?\d*(\.\d+)?$/,
  alphaNumericWithBasicPunc: /^[a-zA-Z0-9\s., '"!?;:/()\-&_]+$/,
  mobileNo: /^[6-9][0-9]{9}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  latitude: /^(?!0(\.0+)?$)[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
  longitude:
    /^(?!0+$)(?!0+\.0+$)[-+]?((1[0-7]\d|0?\d{1,2})(\.\d+)?|180(\.0+)?)$/,
  panNumber: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  aadhaarNumber: /^(\d{4}\s\d{4}\s\d{4}|\d{12})$/,
};

export const loginFormSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Please enter your password."),
});

export const addWorkerFormSchema = z.object({
  name: z.string().min(1, "Please enter the worker's full name"),
  mobile: z
    .string()
    .regex(REGEX.mobileNo, "A valid 10-digit mobile number is required"),
  aadhaar: z
    .string()
    .refine((val) => !val || REGEX.aadhaarNumber.test(val), {
      message: "Please provide a valid Aadhaar number (optional)",
    })
    .optional(),
  pan: z
    .string()
    .refine((val) => !val || REGEX.panNumber.test(val), {
      message: "Please provide a valid PAN number, ABCDE1234F  (optional)",
    })
    .optional(),
  email: z
    .string()
    .refine((val) => !val || REGEX.email.test(val), {
      message: "Please provide a valid email address (optional)",
    })
    .optional(),
  address: z
    .string()
    .refine((val) => !val || REGEX.alphaNumericWithBasicPunc.test(val), {
      message: "Please provide a valid email address (optional)",
    })
    .optional(),
  salary: z
    .string()
    .min(1, "Please enter the worker's monthly salary")
    .refine((val) => !val || REGEX.floatNumbersOnly.test(val), {
      message: "Enter the worker's monthly salary",
    }),
  salaryPerDay: z
    .string()
    .optional()
    .refine((val) => !val || REGEX.floatNumbersOnly.test(val), {
      message:
        "This field is auto-calculated. Enter a worker's monthly salary.",
    }),
  salaryPerHour: z
    .string()
    .optional()
    .refine((val) => !val || REGEX.floatNumbersOnly.test(val), {
      message:
        "This field is auto-calculated. Enter a worker's monthly salary.",
    }),
});

// export const editProfileSchema = z.object({
//   name: z.string().min(1, "Please provide a valid name"),
//   mobile: z
//     .string()
//     .regex(REGEX.mobileNo, "Please provide a valid phone number"),
//   email: z.string().regex(REGEX.email, "Please provide a valid email address"),
//   status: z.boolean().optional(),
// });

// export const addProjectFormSchema = z.object({
//   name: z.string().min(1, "Project Name is required"),
//   deadline: z.date({ required_error: "Project Deadline is required" }),
//   latitude: z.string().refine((val) => val === "" || REGEX.latitude.test(val), {
//     message: "Please enter a valid latitude",
//   }),
//   longitude: z
//     .string()
//     .refine((val) => val === "" || REGEX.longitude.test(val), {
//       message: "Please enter a valid longitude",
//     }),
//   address: z.string().min(1, "Address is required"),
//   projectHead: z.string().min(1, "Project Head is required"),
//   siteHead: z.string().min(1, "Site Head is required"),
//   supervisor: z.string().min(1, "Supervisor is required"),
// });
