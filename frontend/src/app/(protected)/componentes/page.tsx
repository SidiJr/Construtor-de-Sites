import BaseTable from "@/components/BaseTable/BaseTable";
import { tipoComponente } from "@/lib/types";

const columns: string[] = ["id", "nome", "tipo"];

export default function ComponenteTable() {
  return (
    <BaseTable
      route="componente"
      columns={columns}
      customMask={{
        tipo: tipoComponente,
      }}
    />
  );
}
