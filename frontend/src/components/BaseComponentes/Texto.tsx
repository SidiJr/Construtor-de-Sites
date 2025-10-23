"use client";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import BaseSection from "./UI/BaseSection";
import { ConfigField, ConfigForm } from "../BaseForm/ConfigForm";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function BaseTexto({ value = "Clique para editar o texto" }) {
  const { values, setValue } = useForm();

  console.log(values);

  const campos: ConfigField[] = useMemo(
    () => [
      {
        name: "configuracoes.posicao",
        label: "Posição do texto:",
        type: "select",
        placeholder: "Selecione a posição",
        optionsLabel: "Opções de posição",
        defaultValue: "justify-center",
        options: [
          { value: "justify-center", label: "Centralizado" },
          { value: "justify-end", label: "Direita" },
          { value: "justify-start", label: "Esquerda" },
        ],
      },
      {
        name: "configuracoes.tamanho",
        label: "Tamanho da fonte:",
        type: "select",
        placeholder: "Selecione o tamanho",
        optionsLabel: "Opções de tamanho",
        defaultValue: "text-base",
        options: [
          { value: "text-sm", label: "Pequeno" },
          { value: "text-base", label: "Médio" },
          { value: "text-lg", label: "Grande" },
          { value: "text-xl", label: "Extra grande" },
        ],
      },
      {
        name: "configuracoes.alinhamento",
        label: "Alinhamento do texto:",
        type: "select",
        placeholder: "Selecione o alinhamento",
        optionsLabel: "Opções de alinhamento",
        defaultValue: "text-left",
        options: [
          { value: "text-left", label: "Esquerda" },
          { value: "text-center", label: "Centralizado" },
          { value: "text-right", label: "Direita" },
          { value: "text-justify", label: "Justificado" },
        ],
      },
      {
        name: "configuracoes.cor",
        label: "Cor do texto:",
        type: "input",
        defaultValue: "#000000",
      },
    ],
    []
  );

  const texto = useMemo(
    () => values?.configuracoes?.texto ?? value,
    [values?.configuracoes?.texto, value]
  );

  const posicaoClasse = useMemo(() => {
    return values?.configuracoes?.posicao || "text-center";
  }, [values?.configuracoes?.posicao]);

  const tamanhoClasse = useMemo(() => {
    return values?.configuracoes?.tamanho || "text-base";
  }, [values?.configuracoes?.tamanho]);

  const alinhamentoClasse = useMemo(() => {
    return values?.configuracoes?.alinhamento || "text-left";
  }, [values?.configuracoes?.alinhamento]);

  const corClasse = useMemo(() => {
    return values?.configuracoes?.cor || "#000000";
  }, [values?.configuracoes?.cor]);

  return (
    <>
      <BaseSection>
        <ContentEditable
          value={texto}
          onChange={(novoValor) => setValue("configuracoes.texto", novoValor)}
          className={cn(posicaoClasse)}
          classNameChildren={cn(tamanhoClasse, alinhamentoClasse)}
          style={{ color: corClasse }}
        />
      </BaseSection>
      <ConfigForm fields={campos} />
    </>
  );
}
