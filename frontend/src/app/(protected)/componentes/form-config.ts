import { FieldConfig, tipoComponente } from "@/lib/types";

export const tipoOptions = [
  { label: tipoComponente.TITULO, value: "TITULO" },
  { label: tipoComponente.TEXTO, value: "TEXTO" },
  { label: tipoComponente.TITULO_TEXTO, value: "TITULO_TEXTO" },
  { label: tipoComponente.NAVBAR, value: "NAVBAR" },
  { label: tipoComponente.FOOTER, value: "FOOTER" },
];

export const componenteFields: FieldConfig[] = [
  {
    name: "nome",
    label: "Nome do Componente",
    type: "text",
    placeholder: "Digite o nome",
    required: true,
  },
  {
    name: "tipo",
    label: "Tipo",
    type: "select",
    placeholder: "Selecione o tipo",
    optionsLabel: "Tipos",
    options: tipoOptions,
    required: true,
  },
];
