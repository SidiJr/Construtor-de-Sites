/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "@/contexts/FormContext";
import { api } from "@/lib/api";
import { componentMap } from "../BaseComponentes/types/types";

type ComponenteInfo = {
  configuracoes: any;
  id: number;
  nome: string;
  tipo?: string;
};
type SelectedItem = { componenteId: number; ordem: number };

export default function ComponentsSearch({
  paginaId,
  type,
}: {
  paginaId?: string;
  type: string;
}) {
  const { values, setValue } = useForm();
  const [all, setAll] = useState<ComponenteInfo[]>([]);
  const [q, setQ] = useState("");

  const isLayout = type === "layout";

  // Busca todos os componentes disponíveis (sempre)
  useEffect(() => {
    let mounted = true;
    fetch(`${api}/componente`)
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data ?? [];
        if (mounted) setAll(list);
      })
      .catch(() => {
        if (mounted) setAll([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Se existe paginaId, busca a página/layout e inicializa values
  useEffect(() => {
    if (!paginaId) return;
    let mounted = true;

    fetch(`${api}/${type}/${paginaId}`)
      .then((r) => r.json())
      .then((resp) => {
        if (!mounted) return;
        const data = resp?.data;

        if (isLayout) {
          // layout retorna `componentes: Componente[]`
          const comps = data?.componentes ?? [];
          const ids = comps.map((c: any) => Number(c.id)).filter(Boolean);
          const currentIds = (values.componentesIds as number[]) || [];
          if (
            ids.length > 0 &&
            JSON.stringify(currentIds) !== JSON.stringify(ids)
          ) {
            setValue("componentesIds", ids);
          }
        } else {
          // página retorna componentesComPagina
          const rels = data?.componentesComPagina ?? [];
          const mapped: SelectedItem[] = rels
            .map((r: any, idx: number) => {
              const cid = r.componente?.id ?? r.componenteId ?? null;
              return cid
                ? { componenteId: Number(cid), ordem: r.ordem ?? idx + 1 }
                : null;
            })
            .filter(Boolean) as SelectedItem[];

          const current = (values.componentes as SelectedItem[]) || [];
          if (
            mapped.length > 0 &&
            JSON.stringify(current) !== JSON.stringify(mapped)
          ) {
            setValue("componentes", mapped);
          }
        }
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginaId, type]);

  const selectedIds: number[] = (values.componentesIds as number[]) || [];
  const selectedObjects: SelectedItem[] =
    (values.componentes as SelectedItem[]) || [];

  const selectedItems: SelectedItem[] = isLayout
    ? selectedIds.map((id, idx) => ({ componenteId: id, ordem: idx + 1 }))
    : selectedObjects;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return all;
    return all.filter(
      (c) =>
        c.nome.toLowerCase().includes(term) ||
        (c.tipo ?? "").toString().toLowerCase().includes(term)
    );
  }, [all, q]);

  function add(cId: number) {
    if (isLayout) {
      const nextIds = Array.from(new Set([...(selectedIds || []), cId]));
      setValue("componentesIds", nextIds);
      return;
    }

    if (selectedObjects.find((s) => s.componenteId === cId)) return;
    const next = [
      ...selectedObjects,
      { componenteId: cId, ordem: selectedObjects.length + 1 },
    ];
    setValue("componentes", next);
  }

  function remove(cId: number) {
    if (isLayout) {
      const nextIds = selectedIds.filter((id) => id !== cId);
      setValue("componentesIds", nextIds);
      return;
    }

    const next = selectedObjects
      .filter((s) => s.componenteId !== cId)
      .map((s, i) => ({ ...s, ordem: i + 1 }));
    setValue("componentes", next);
  }

  return (
    <div className="mb-6">
      <h3 className="mb-2 font-medium">Componentes (opcional)</h3>

      <div className="flex gap-2 mb-3">
        <input
          className="input"
          placeholder="Buscar componente por nome ou tipo..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Button type="button" variant="ghost" onClick={() => setQ("")}>
          Limpar
        </Button>
      </div>

      <div className="grid gap-2">
        {filtered.slice(0, 50).map((c) => {
          const isSelected = isLayout
            ? selectedIds.includes(c.id)
            : !!selectedObjects.find((s) => s.componenteId === c.id);

          return (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 rounded border p-2"
            >
              <div className="flex-1">
                <div className="font-medium">{c.nome}</div>
                {c.tipo && (
                  <div className="text-sm text-muted-foreground">{c.tipo}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isSelected ? (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(c.id)}
                  >
                    Remover
                  </Button>
                ) : (
                  <Button type="button" onClick={() => add(c.id)}>
                    Adicionar
                  </Button>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Nenhum componente encontrado.
          </div>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="mt-4">
          <div className="text-sm text-muted-foreground mb-2">
            Selecionados:
          </div>
          <ol className="list-decimal ml-5">
            {selectedItems
              .slice()
              .sort((a, b) => a.ordem - b.ordem)
              .map((s) => {
                const info = all.find((c) => c.id === s.componenteId);
                return (
                  <li
                    key={s.componenteId}
                    className="mb-1 flex items-center gap-3"
                  >
                    <div className="flex-1">
                      {info?.nome ?? `#${s.componenteId}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ordem: {s.ordem}
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-6">
          <h4 className="mb-3 font-medium">Pré-visualização</h4>
          <div className="space-y-4">
            {selectedItems
              .slice()
              .sort((a, b) => a.ordem - b.ordem)
              .map((s) => {
                const info = all.find((c) => c.id === s.componenteId);
                if (!info) return null;
                const ComponentType =
                  componentMap[info.tipo ?? "DEFAULT"] ??
                  componentMap["DEFAULT"];
                return (
                  <div
                    key={s.componenteId}
                    className="border rounded p-3 bg-card"
                  >
                    <ComponentType
                      value=""
                      isViewMode
                      configuracoes={info.configuracoes}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
