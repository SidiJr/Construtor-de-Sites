"use client";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import BaseSection from "./UI/BaseSection";
import { ConfigField, ConfigForm } from "../BaseForm/ConfigForm";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export default function Navbar({
  value = "Nome do site",
  isViewMode = false,
  configuracoes = {},
}: {
  value?: string;
  isViewMode?: boolean;
  configuracoes?: {
    texto?: string;
    cor?: string;
    textoCor?: string;
  } | null;
}) {
  const { values, setValue } = useForm();

  const campos: ConfigField[] = useMemo(
    () => [
      {
        name: "configuracoes.cor",
        label: "Cor de fundo:",
        type: "input",
        defaultValue: "#ffffff",
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

  const texto = useMemo(
    () => configuracoes?.texto ?? values?.configuracoes?.texto ?? value,
    [configuracoes?.texto, values?.configuracoes?.texto, value]
  );

  const fundo = useMemo(
    () => configuracoes?.cor ?? values?.configuracoes?.cor ?? "#ffffff",
    [configuracoes?.cor, values?.configuracoes?.cor]
  );

  const textoCor = useMemo(
    () => configuracoes?.textoCor ?? values?.configuracoes?.textoCor ?? "#000000",
    [configuracoes?.textoCor, values?.configuracoes?.textoCor]
  );

  return (
    <>
      <BaseSection>
        <div
          className={cn("w-full rounded-md")}
          style={{ backgroundColor: fundo }}
        >
          <div className="h-16 flex items-center px-4">
            <ContentEditable
              value={texto}
              onChange={(novoValor) => setValue("configuracoes.texto", novoValor)}
              className="flex-1"
              classNameChildren="text-lg font-medium"
              style={{ color: textoCor }}
              isViewMode={isViewMode}
            />
          </div>
        </div>
      </BaseSection>
      {!isViewMode && <ConfigForm fields={campos} />}
    </>
  );
}