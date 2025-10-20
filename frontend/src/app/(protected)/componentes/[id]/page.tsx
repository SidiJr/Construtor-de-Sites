"use client";

// import { useParams } from "next/navigation";
import { FormProvider } from "@/contexts/FormContext";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { componenteFields } from "../form-config";

export default function ComponenteExistente() {
//   const { id } = useParams();

  return (
    <FormProvider>
      <BaseForm
        fields={componenteFields}
        route="componente"
        redirect="componentes"
      />
    </FormProvider>
  );
}
