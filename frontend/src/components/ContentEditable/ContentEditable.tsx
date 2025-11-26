"use client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ContentEditableProps {
  value: string;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  classNameChildren?: string;
  style?: React.CSSProperties;
  isViewMode?: boolean;
}

export default function ContentEditable({
  value,
  onChange,
  placeholder = "Clique para editar!",
  className = "",
  classNameChildren = "",
  style,
  isViewMode = false,
}: ContentEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
      adjustHeight();
    }
  }, [isEditing]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange?.(content);
  };

  const handleClick = () => setIsEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    adjustHeight();
  };

  return (
    <div onClick={handleClick} className={cn("w-full flex", className)}>
      {isViewMode ? (
        <p className={cn("cursor-text p-10", classNameChildren)} style={style}>
          {content || <span>{placeholder}</span>}
        </p>
      ) : isEditing ? (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "resize-none overflow-hidden bg-transparent p-10",
            classNameChildren
          )}
          rows={1}
          style={style}
        />
      ) : (
        <p className={cn("cursor-text p-10", classNameChildren)} style={style}>
          {content || <span>{placeholder}</span>}
        </p>
      )}
    </div>
  );
}
