"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type BaseTableProps = {
  route: string;
  columns: string[];
  customMask?: Record<string, Record<string, string>>;
};

export default function BaseTable({
  route,
  columns,
  customMask = {},
}: BaseTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>[] | null>(null);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const res = await fetch(`${api}/${route}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        if (result.status === "error") {
          toast.error(result.message);
        } else {
          setData(result?.data || []);
        }
      } catch (err) {
        setData([]);
        console.error(err);
      }
    };

    handleGetData();
  }, [route]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </TableHead>
          ))}
         <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data === null ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-4">
              Carregando...
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-4">
              Nenhum dado encontrado.
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((col) => {
                const value = item[col];
                const mask = customMask[col]; //Verifica se tem máscara pra essa coluna
                const displayValue =
                  mask && mask[value] ? mask[value] : String(value);
                return <TableCell key={col}>{displayValue}</TableCell>;
              })}
              <TableCell></TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
