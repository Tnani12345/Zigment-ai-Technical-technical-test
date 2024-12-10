// src/types/schema.ts

export interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select and radio types
  validation?: { pattern: string; message: string }; // Add the validation field here
}

export interface FormSchema {
  formTitle: string;
  formDescription?: string;
  fields: FormField[];
}
