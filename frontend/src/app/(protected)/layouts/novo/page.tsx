"use client";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import ComponentsSearch from "@/components/ComponenteSearch/ComponenteSearch";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";

export default function LayoutNovo() {
  const fields: FieldConfig[] = [
    {
      name: "nome",
      label: "Nome",
      type: "text",
      placeholder: "Nome do layout",
      required: true,
    },
  ];

  return (
    <FormProvider>
      <BaseForm fields={fields} route="layout" redirect="layouts">
        <ComponentsSearch type="layout"/>
      </BaseForm>
    </FormProvider>
  );
}
