import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Principal({ children }: Props) {
  return (
    <div className="grid h-dvh min-h-0 w-full grid-rows-[auto_1fr] px-2 py-1">
      {children}
    </div>
  );
}
