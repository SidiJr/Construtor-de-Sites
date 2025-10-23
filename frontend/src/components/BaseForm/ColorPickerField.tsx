"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

interface ColorPickerFieldProps {
  valorAtual: string;
  onChange: (cor: string) => void;
  paleta?: string[];
}

export function ColorPickerField({
  valorAtual,
  onChange,
  paleta = [
    "#f97316", // orange-500
    "#ef4444", // red-500
    "#facc15", // yellow-500
    "#22c55e", // green-500
    "#3b82f6", // blue-500
    "#6366f1", // indigo-500
    "#a855f7", // purple-500
    "#ec4899", // pink-500
    "#6b7280", // gray-500
    "#f43f5e", // rose-500
    "#10b981", // emerald-500
    "#8b5cf6", // violet-500
    "#f59e0b", // amber-500
  ],
}: ColorPickerFieldProps) {
  const [color, setColor] = useState(valorAtual);

  // Sincroniza com valor do contexto
  useEffect(() => {
    setColor(valorAtual);
  }, [valorAtual]);

  const handleChange = (novaCor: string) => {
    setColor(novaCor);
    onChange(novaCor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-12 h-8 border rounded"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 flex flex-col gap-2 items-center">
        {/* Input para digitar a cor */}
        <Input
          value={color}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="#000000"
        />
        {/* Paleta de cores rápidas */}
        <div className="flex gap-2 flex-wrap">
          {paleta.map((c) => (
            <button
              key={c}
              type="button"
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: c }}
              onClick={() => handleChange(c)}
            />
          ))}
        </div>
        {/* HexColorPicker */}
        <div>
          <HexColorPicker color={color} onChange={handleChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
