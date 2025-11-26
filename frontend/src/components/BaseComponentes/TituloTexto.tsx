"use client";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import BaseSection from "./UI/BaseSection";
import { ConfigField, ConfigForm } from "../BaseForm/ConfigForm";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function BaseTituloTexto({
  value = "Clique para editar o título",
  isViewMode = false,
  configuracoes = {},
}: {
  value?: string;
  isViewMode?: boolean;
  configuracoes?: {
    titulo?: string;
    texto?: string;
    posicao?: string;
    tituloTamanho?: string;
    textoTamanho?: string;
    alinhamento?: string;
    tituloCor?: string;
    textoCor?: string;
  } | null;
}) {
  const { values, setValue } = useForm();

  const campos: ConfigField[] = useMemo(
    () => [
      {
        name: "configuracoes.posicao",
        label: "Posição do conteúdo:",
        type: "select",
        placeholder: "Selecione a posição",
        optionsLabel: "Opções de posição",
        defaultValue: "justify-center",
        options: [
          { value: "justify-center", label: "Centralizado" },
          { value: "justify-start", label: "Esquerda" },
          { value: "justify-end", label: "Direita" },
        ],
      },
      {
        name: "configuracoes.tituloTamanho",
        label: "Tamanho do título:",
        type: "select",
        placeholder: "Selecione o tamanho",
        optionsLabel: "Opções de tamanho do título",
        defaultValue: "text-xl",
        options: [
          { value: "text-lg", label: "Grande" },
          { value: "text-xl", label: "Extra grande" },
          { value: "text-2xl", label: "2x Extra grande" },
          { value: "text-3xl", label: "3x Extra grande" },
        ],
      },
      {
        name: "configuracoes.textoTamanho",
        label: "Tamanho do texto:",
        type: "select",
        placeholder: "Selecione o tamanho",
        optionsLabel: "Opções de tamanho do texto",
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
        label: "Alinhamento do conteúdo:",
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
        name: "configuracoes.tituloCor",
        label: "Cor do título:",
        type: "input",
        defaultValue: "#000000",
      },
      {
        name: "configuracoes.textoCor",
        label: "Cor do texto:",
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
  const texto = useMemo(
    () => configuracoes?.texto ?? values?.configuracoes?.texto ?? value,
    [configuracoes?.texto, values?.configuracoes?.texto, value]
  );

  const posicaoClasse = useMemo(
    () =>
      configuracoes?.posicao ??
      values?.configuracoes?.posicao ??
      "justify-center",
    [configuracoes?.posicao, values?.configuracoes?.posicao]
  );
  const alinhamentoClasse = useMemo(
    () =>
      configuracoes?.alinhamento ??
      values?.configuracoes?.alinhamento ??
      "text-left",
    [configuracoes?.alinhamento, values?.configuracoes?.alinhamento]
  );
  const tituloTamanhoClasse = useMemo(
    () =>
      configuracoes?.tituloTamanho ??
      values?.configuracoes?.tituloTamanho ??
      "text-xl",
    [configuracoes?.tituloTamanho, values?.configuracoes?.tituloTamanho]
  );
  const textoTamanhoClasse = useMemo(
    () =>
      configuracoes?.textoTamanho ??
      values?.configuracoes?.textoTamanho ??
      "text-base",
    [configuracoes?.textoTamanho, values?.configuracoes?.textoTamanho]
  );
  const tituloCorClasse = useMemo(
    () =>
      configuracoes?.tituloCor ?? values?.configuracoes?.tituloCor ?? "#000000",
    [configuracoes?.tituloCor, values?.configuracoes?.tituloCor]
  );
  const textoCorClasse = useMemo(
    () =>
      configuracoes?.textoCor ?? values?.configuracoes?.textoCor ?? "#000000",
    [configuracoes?.textoCor, values?.configuracoes?.textoCor]
  );

  return (
    <>
      <BaseSection>
        <ContentEditable
          value={titulo}
          onChange={(novoValor) => setValue("configuracoes.titulo", novoValor)}
          className={cn(posicaoClasse)}
          classNameChildren={cn(tituloTamanhoClasse, alinhamentoClasse)}
          style={{ color: tituloCorClasse }}
          isViewMode={isViewMode}
        />
        <ContentEditable
          value={texto}
          onChange={(novoValor) => setValue("configuracoes.texto", novoValor)}
          className={cn(posicaoClasse)}
          classNameChildren={cn(textoTamanhoClasse, alinhamentoClasse)}
          style={{ color: textoCorClasse }}
          isViewMode={isViewMode}
        />
      </BaseSection>
      {!isViewMode && <ConfigForm fields={campos} />}
    </>
  );
}
