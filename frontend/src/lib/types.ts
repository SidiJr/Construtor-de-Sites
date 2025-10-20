export type FieldOption = { label: string; value: string };

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  optionsLabel?: string;
};

export const tipoComponente = {
  TEXTO: "Texto",
  TITULO: "Título",
  TITULO_TEXTO: "Título e Texto",
}