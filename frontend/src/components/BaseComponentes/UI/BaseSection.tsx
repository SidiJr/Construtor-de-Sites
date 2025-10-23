import { cn } from "@/lib/utils";

export default function BaseSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("border-2 rounded-md p-10", className)}
    >
      {children}
    </section>
  );
}
