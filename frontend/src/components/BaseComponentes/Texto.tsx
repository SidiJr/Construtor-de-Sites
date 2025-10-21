"use client";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import { BaseComponentProps } from "./types/types";
import BaseSection from "./UI/BaseSection";

export default function BaseTexto({
  value = "Clique para editar o texto",
  className = "",
}: BaseComponentProps) {
  const { values, setValue } = useForm();

  const texto = values?.configuracoes?.texto ?? value;

  return (
    <BaseSection>
      <ContentEditable
        value={texto}
        onChange={(newValue) => setValue("configuracoes.texto", newValue)}
        className="text-lg md:text-xl leading-relaxed"
      />
    </BaseSection>
  );
}
