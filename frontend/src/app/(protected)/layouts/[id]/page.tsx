"use client";


import { useParams } from "next/navigation";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";
import ComponentsSearch from "@/components/ComponenteSearch/ComponenteSearch";

export default function LayoutEdit() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;

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
      <BaseForm fields={fields} route="layout" id={idStr} redirect="layouts">
        <ComponentsSearch paginaId={idStr} type="layout"/>
      </BaseForm>
    </FormProvider>
  );
}
