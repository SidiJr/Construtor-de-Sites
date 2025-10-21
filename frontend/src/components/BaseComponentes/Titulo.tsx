import { useForm } from "@/contexts/FormContext";
import { BaseComponentProps } from "./types/types";
import BaseSection from "./UI/BaseSection";
import ContentEditable from "../ContentEditable/ContentEditable";

export default function BaseTitulo({
  value = "Clique para editar o título",
  className = "",
}: BaseComponentProps) {
  const { values, setValue } = useForm();

  const titulo = values?.configuracoes?.titulo ?? value;

  return (
    <BaseSection>
      <ContentEditable
        value={titulo}
        onChange={(newValue) => setValue("configuracoes.titulo", newValue)}
        className="text-lg md:text-xl leading-relaxed"
      />
    </BaseSection>
  );
}
