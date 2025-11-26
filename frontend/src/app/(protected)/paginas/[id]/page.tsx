"use client";


import { useParams } from "next/navigation";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { FormProvider } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";
import ComponentsSearch from "@/components/ComponenteSearch/ComponenteSearch";

export default function PaginaEdit() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;

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
      <BaseForm fields={fields} route="pagina" id={idStr} redirect="paginas">
        <ComponentsSearch paginaId={idStr} type="pagina"/>
      </BaseForm>
    </FormProvider>
  );
}
