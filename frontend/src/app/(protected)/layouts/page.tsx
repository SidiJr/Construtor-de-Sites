import BaseTable from "@/components/BaseTable/BaseTable";

const columns: string[] = ["id", "nome"];

export default function LayoutTable() {
  return <BaseTable route="layout" columns={columns} />;
}
