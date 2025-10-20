"use client";

import { FormProvider } from "@/contexts/FormContext";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { componenteFields } from "../form-config";

export default function ComponenteNovo() {
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
