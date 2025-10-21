"use client";
import { useEffect, useRef, useState } from "react";

interface ContentEditableProps {
  value: string;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

export default function ContentEditable({
  value,
  onChange,
  placeholder = "Clique para editar",
  className = "",
}: ContentEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Atualiza o texto local quando a prop `value` muda externamente
  useEffect(() => {
    setContent(value);
  }, [value]);

  // Foca no input quando entra no modo de edição
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    onChange?.(content);
  };

  return (
    <div
      className="inline-block"
      onClick={() => !isEditing && setIsEditing(true)}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
        />
      ) : (
        <span className="cursor-text">
          {content || <span>{placeholder}</span>}
        </span>
      )}
    </div>
  );
}
