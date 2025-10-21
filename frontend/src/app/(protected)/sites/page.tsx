import BaseTable from "@/components/BaseTable/BaseTable";

export default function SiteTable() {
  const columns: string[] = ["id", "nome", "dominio"];

  return <BaseTable route="site" columns={columns} />;
}
