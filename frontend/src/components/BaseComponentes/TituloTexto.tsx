import { useForm } from "@/contexts/FormContext";
import { BaseComponentProps } from "./types/types";
import BaseSection from "./UI/BaseSection";
import ContentEditable from "../ContentEditable/ContentEditable";

export default function BaseTituloTexto({
  value = "Clique para editar o título",
  className = "",
}: BaseComponentProps) {
  const { values, setValue } = useForm();
  const titulo = values?.configuracoes?.titulo ?? value;
  const texto = values?.configuracoes?.texto ?? value;
  
  return (
    <BaseSection>
      <ContentEditable
        value={titulo}
        onChange={(newValue) => setValue("configuracoes.titulo", newValue)}
        className="text-lg md:text-xl leading-relaxed"
      />
      <ContentEditable
        value={texto}
        onChange={(newValue) => setValue("configuracoes.texto", newValue)}
        className="text-lg md:text-xl leading-relaxed"
      />
    </BaseSection>
  );
}
