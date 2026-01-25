export type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

export type FieldErrors = Partial<Record<keyof FormState, string>> & { general?: string };
