"use client";
import { useMemo } from "react";
import { useForm } from "@/contexts/FormContext";
import ContentEditable from "../ContentEditable/ContentEditable";
import BaseSection from "./UI/BaseSection";
import { ConfigField, ConfigForm } from "../BaseForm/ConfigForm";
import { cn } from "@/lib/utils";

export default function Footer({
  value = "Texto do footer",
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
        defaultValue: "#f3f4f6",
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
    () => configuracoes?.cor ?? values?.configuracoes?.cor ?? "#f3f4f6",
    [configuracoes?.cor, values?.configuracoes?.cor]
  );

  const textoCor = useMemo(
    () => configuracoes?.textoCor ?? values?.configuracoes?.textoCor ?? "#000000",
    [configuracoes?.textoCor, values?.configuracoes?.textoCor]
  );

  return (
    <>
      <BaseSection>
        <div className={cn("w-full rounded-md")} style={{ backgroundColor: fundo }}>
          <div className="h-20 flex items-center px-4">
            <ContentEditable
              value={texto}
              onChange={(novoValor) => setValue("configuracoes.texto", novoValor)}
              className="w-full"
              classNameChildren="text-sm"
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