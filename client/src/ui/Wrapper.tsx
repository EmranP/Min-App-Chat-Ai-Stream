import type { FC, PropsWithChildren } from "react";

export const Wrapper:FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-full w-full overflow-hidden">
      <div className="max-w-[1400px] px-10 flex flex-col justify-between">
        {children}
      </div>
    </div>
  )
}
