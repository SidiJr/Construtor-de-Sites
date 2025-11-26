"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { useForm } from "@/contexts/FormContext";
import { useEffect } from "react";
import { ColorPickerField } from "./ColorPickerField";

export type ConfigField = {
  name: string;
  label: string;
  type: "select" | "input";
  placeholder?: string;
  optionsLabel?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
};

export type ConfigFormProps = {
  fields: ConfigField[];
};

// Função utilitária para pegar valor via path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValueByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function ConfigForm({ fields }: ConfigFormProps) {
  const { values, setValue } = useForm();

  // Inicializa valores padrão
  useEffect(() => {
    fields.forEach((field) => {
      const valorSalvo = getValueByPath(values, field.name);
      const valorAtual =
        valorSalvo ?? field.defaultValue ?? field.options?.[0]?.value;
      if (!valorSalvo && valorAtual) {
        setValue(field.name, valorAtual);
      }
    });
  }, [fields, setValue, values]);

  return (
    <FieldGroup>
      <FieldSet>
        {fields.map((field) => {
          const valorAtual =
            getValueByPath(values, field.name) ??
            field.defaultValue ??
            field.options?.[0]?.value ??
            "";

          return (
            <Field key={field.name}>
              <FieldLabel>{field.label}</FieldLabel>

              {[
                "configuracoes.cor",
                "configuracoes.tituloCor",
                "configuracoes.textoCor",
              ].includes(field.name) ? (
                <ColorPickerField
                  valorAtual={valorAtual}
                  onChange={(novaCor) => setValue(field.name, novaCor)}
                />
              ) : field.type === "select" && field.options ? (
                <Select
                  value={valorAtual}
                  onValueChange={(val) => setValue(field.name, val)}
                >
                  <SelectTrigger className="w-[220px]">
                    <SelectValue>
                      {field.options.find((o) => o.value === valorAtual)
                        ?.label || field.placeholder}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {field.optionsLabel && (
                        <SelectLabel>{field.optionsLabel}</SelectLabel>
                      )}
                      {field.options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div>Campo não desenvolvido!</div>
              )}
            </Field>
          );
        })}
      </FieldSet>
    </FieldGroup>
  );
}
