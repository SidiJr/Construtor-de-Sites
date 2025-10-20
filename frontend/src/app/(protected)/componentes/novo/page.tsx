import { BaseForm } from "@/components/BaseForm/BaseForm";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig, tipoComponente } from "@/lib/types";

export default function ComponenteNovo() {
  const tipoOptions = [
    { label: tipoComponente.TITULO, value: "TITULO" },
    { label: tipoComponente.TEXTO, value: "TEXTO" },
    { label: tipoComponente.TITULO_TEXTO, value: "TITULO_TEXTO" },
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
