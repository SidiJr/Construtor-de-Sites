export default function BaseSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full text-center">{children}</section>;
}
