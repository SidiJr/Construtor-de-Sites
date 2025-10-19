import { BaseForm } from "@/components/BaseForm/BaseForm";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";

export default function ComponenteNovo() {
  const tipoOptions = [
    { label: "Título", value: "TITULO" },
    { label: "Texto", value: "TEXTO" },
    { label: "Título e Texto", value: "TITULO_TEXTO" },
  ];

  const fields: FieldConfig[] = [
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
    },
  ];

  return (
    <FormProvider>
      <BaseForm fields={fields} route="componente" redirect="componentes"/>
    </FormProvider>
  );
}
