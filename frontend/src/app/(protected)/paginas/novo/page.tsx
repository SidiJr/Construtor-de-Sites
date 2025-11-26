"use client";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import ComponentsSearch from "@/components/ComponenteSearch/ComponenteSearch";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";

export default function PaginaNovo() {
  const fields: FieldConfig[] = [
    {
      name: "titulo",
      label: "Título",
      type: "text",
      placeholder: "Título da página",
      required: true,
    },
    {
      name: "endereco",
      label: "Endereço",
      type: "text",
      placeholder: "Endereço da página",
      required: true,
    },
  ];

  return (
    <FormProvider>
      <BaseForm fields={fields} route="pagina" redirect="paginas">
        <ComponentsSearch type="pagina"/>
      </BaseForm>
    </FormProvider>
  );
}
