import BaseTable from "@/components/BaseTable/BaseTable";

const columns: string[] = ["id", "titulo"];

export default function PaginaTable() {
  return <BaseTable route="pagina" columns={columns} />;
}
