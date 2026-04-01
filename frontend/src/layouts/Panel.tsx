import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Panel({ children }: Props) {
  return (
    <div className="gird-rows-[minmax(0,1fr)_auto] grid min-h-0 gap-3">
      {children}
    </div>
  );
}
