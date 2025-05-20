import type { FC } from "react";

interface ITitleProps {
  title?: string
  subTitle?: string
  text?: string
}

export const Title:FC<ITitleProps> = ({title, subTitle, text}) => {
  return (
    <div className="mb-10 space-y-8">
      {title && <h1 className="text-4xl font-bold">{title}</h1>}
      {subTitle && <h2 className="text-5xl font-bold">{subTitle}</h2>}
      {text && <p className="text-2xl text-gray-500 w-[510px]">{text}</p>}
    </div>
  )
}
