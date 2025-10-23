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
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const handleEdit = useCallback(
    async (id: string | number) => {
      router.push(`/${route}s/${id}`);
    },
    [router, route]
  );

  const handleDelete = useCallback(
    async (id: string | number) => {
      console.log("Excluir id:", id);
      try {
        const res = await fetch(`${api}/${route}/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();

        if (result.status === "error") {
          toast.error(result.message);
        } else {
          toast.success(result.message);
          setData(
            (prevData) => prevData?.filter((item) => item.id !== id) || []
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    [route]
  );

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
            <TableCell
              colSpan={columns.length + 1}
              className="text-center py-4"
            >
              Carregando...
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={columns.length + 1}
              className="text-center py-4"
            >
              Nenhum dado encontrado.
            </TableCell>
          </TableRow>
        ) : (
          data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((col) => {
                const value = item[col];
                const mask = customMask[col];
                const displayValue =
                  mask && mask[value] ? mask[value] : String(value);
                return <TableCell key={col}>{displayValue}</TableCell>;
              })}
              <TableCell className="flex gap-2">
                {/* Botão de Editar */}
                <Button
                  variant="default"
                  size="sm"
                  className="w-8 h-8 p-0 flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => handleEdit(item.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>

                {/* Botão de Excluir */}
                <Button
                  variant="default"
                  size="sm"
                  className="w-8 h-8 p-0 flex items-center justify-center bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
