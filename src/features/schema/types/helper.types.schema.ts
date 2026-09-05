/** Schema jadvalining bitta qatori */
export type SchemaRow = {
  name: string;
  type: string;
  /** "ha" | "yo'q" | "auto" */
  req: string;
  control: string;
  /** Qayerda ko'rinadi — faqat asosiy jadvalda */
  where?: string;
};

export type ValidationRule = {
  n: string;
  field: string;
  msg: string;
};

export type SchemaNote = {
  name: string;
  body: string;
};
