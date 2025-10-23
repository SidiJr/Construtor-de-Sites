"use client";

import { FormProvider, useForm } from "@/contexts/FormContext";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { componenteFields } from "../form-config";
import { useMemo } from "react";
import { FieldLabel } from "@/components/ui/field";
import { componentMap } from "@/components/BaseComponentes/types/types";

function ComponenteNovoContent() {
  const { values } = useForm();

  const ComponentType = useMemo(() => {
    const selectedType = values?.tipo || "DEFAULT";
    return componentMap[selectedType];
  }, [values?.tipo]);

  return (
    <>
      <BaseForm
        fields={componenteFields}
        route="componente"
        redirect="componentes"
      >
        <FieldLabel>{"Configurações do Componente:"}</FieldLabel>
        <ComponentType value="" />
      </BaseForm>
    </>
  );
}

export default function ComponenteNovo() {
  return (
    <FormProvider>
      <ComponenteNovoContent />
    </FormProvider>
  );
}
