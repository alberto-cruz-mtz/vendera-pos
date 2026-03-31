import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Principal({ children }: Props) {
  return (
    <div className="grid h-dvh min-h-0 w-full grid-rows-[auto_minmax(0,1fr)_auto] px-2 py-1">
      {children}
    </div>
  );
}
