"use client";

import { FormProvider, useForm } from "@/contexts/FormContext";
import { BaseForm } from "@/components/BaseForm/BaseForm";
import { componenteFields } from "../form-config";
import BaseTexto from "@/components/BaseComponentes/Texto";
import { useMemo } from "react";
import BaseTitulo from "@/components/BaseComponentes/Titulo";
import BaseTituloTexto from "@/components/BaseComponentes/TituloTexto";
import { FieldLabel } from "@/components/ui/field";
import BaseSection from "@/components/BaseComponentes/UI/BaseSection";

function Default() {
  return (
    <BaseSection>
      <p className="text-center text-base">Selecione um componente!</p>
    </BaseSection>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {
  DEFAULT: Default,
  TEXTO: BaseTexto,
  TITULO: BaseTitulo,
  TITULO_TEXTO: BaseTituloTexto,
};

function ComponenteNovoContent() {
  const { values } = useForm();

  // O campo "tipo" vem do formulário
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
