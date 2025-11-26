"use client";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import BaseSection from "./UI/BaseSection";
import { ConfigField, ConfigForm } from "../BaseForm/ConfigForm";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function BaseTitulo({
  value = "Clique para editar o título",
  isViewMode = false,
  configuracoes = {},
}: {
  value?: string;
  isViewMode?: boolean;
  configuracoes?: {
    titulo?: string;
    posicao?: string;
    tamanho?: string;
    alinhamento?: string;
    cor?: string;
  } | null;
}) {
  const { values, setValue } = useForm();

  const campos: ConfigField[] = useMemo(
    () => [
      {
        name: "configuracoes.posicao",
        label: "Posição do título:",
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
        label: "Tamanho do título:",
        type: "select",
        placeholder: "Selecione o tamanho",
        optionsLabel: "Opções de tamanho",
        defaultValue: "text-xl",
        options: [
          { value: "text-lg", label: "Grande" },
          { value: "text-xl", label: "Extra grande" },
          { value: "text-2xl", label: "2x Extra grande" },
          { value: "text-3xl", label: "3x Extra grande" },
        ],
      },
      {
        name: "configuracoes.alinhamento",
        label: "Alinhamento do título:",
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
        label: "Cor do título:",
        type: "input",
        defaultValue: "#000000",
      },
    ],
    []
  );

  const titulo = useMemo(
    () => configuracoes?.titulo ?? values?.configuracoes?.titulo ?? value,
    [configuracoes?.titulo, values?.configuracoes?.titulo, value]
  );

  const posicaoClasse = useMemo(
    () =>
      configuracoes?.posicao ?? values?.configuracoes?.posicao ?? "text-center",
    [configuracoes?.posicao, values?.configuracoes?.posicao]
  );

  const tamanhoClasse = useMemo(
    () => configuracoes?.tamanho ?? values?.configuracoes?.tamanho ?? "text-xl",
    [configuracoes?.tamanho, values?.configuracoes?.tamanho]
  );

  const alinhamentoClasse = useMemo(
    () =>
      configuracoes?.alinhamento ??
      values?.configuracoes?.alinhamento ??
      "text-left",
    [configuracoes?.alinhamento, values?.configuracoes?.alinhamento]
  );

  const corClasse = useMemo(
    () => configuracoes?.cor ?? values?.configuracoes?.cor ?? "#000000",
    [configuracoes?.cor, values?.configuracoes?.cor]
  );

  return (
    <>
      <BaseSection>
        <ContentEditable
          value={titulo}
          onChange={(novoValor) => setValue("configuracoes.titulo", novoValor)}
          className={cn(posicaoClasse)}
          classNameChildren={cn(tamanhoClasse, alinhamentoClasse)}
          style={{ color: corClasse }}
          isViewMode={isViewMode}
        />
      </BaseSection>
      {!isViewMode && <ConfigForm fields={campos} />}
    </>
  );
}
