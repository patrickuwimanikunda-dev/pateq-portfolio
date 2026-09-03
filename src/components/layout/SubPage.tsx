"use client";

export default function SubPage({
  title,
  currentPath,
  children,
}: {
  title: string;
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-24">{children}</div>
  );
}
