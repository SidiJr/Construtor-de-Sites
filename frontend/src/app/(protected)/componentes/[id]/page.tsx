"use client";

import { FormProvider, useForm } from "@/contexts/FormContext";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { componenteFields } from "../form-config";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { FieldLabel } from "@/components/ui/field";
import { componentMap } from "@/components/BaseComponentes/types/types";

function ComponenteExistenteContent({ id }: { id: string }) {
  const { values } = useForm();

  const ComponentType = useMemo(() => {
    const selectedType = values?.tipo || "DEFAULT";
    return componentMap[selectedType];
  }, [values?.tipo]);

  return (
    <BaseForm
      fields={componenteFields}
      route="componente"
      redirect="componentes"
      id={id}
    >
      <FieldLabel>Configurações do Componente:</FieldLabel>
      <ComponentType />
    </BaseForm>
  );
}

export default function ComponenteExistente() {
  const { id } = useParams();
  const idStr = Array.isArray(id) ? id[0] : id;

  return (
    <FormProvider>
      {idStr && <ComponenteExistenteContent id={idStr} />}
    </FormProvider>
  );
}
