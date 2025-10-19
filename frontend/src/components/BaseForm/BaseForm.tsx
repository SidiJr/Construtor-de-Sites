"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@/contexts/FormContext";
import { FieldConfig } from "@/lib/types";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type BaseFormProps = {
  fields: FieldConfig[];
  route: string;
  redirect?: string;
};

export function BaseForm({ fields, route, redirect }: BaseFormProps) {
  const { values, setValue } = useForm();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.status === "error") {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        if (redirect) {
          router.push(`/${redirect}`);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            {fields.map((field) => (
              <Field key={field.name} className="mb-4">
                <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>

                {field.type === "textarea" ? (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    required={field.required}
                  />
                ) : field.type === "select" && field.options ? (
                  <Select
                    value={values[field.name] || ""}
                    onValueChange={(val) => setValue(field.name, val)}
                  >
                    <SelectTrigger id={field.name}>
                      <SelectValue placeholder={field.placeholder} />
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
                  <Input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={values[field.name] || ""}
                    onChange={(e) =>
                      setValue(
                        field.name,
                        field.type === "number"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                    required={field.required}
                  />
                )}
              </Field>
            ))}
          </FieldSet>

          <Field orientation="horizontal" className="flex gap-2 mt-4">
            <Button type="submit">Salvar</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
