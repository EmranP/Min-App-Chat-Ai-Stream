import type { FC } from "react";
import { Microphone } from "../../ui/Microphone";
import { Input } from "../../ui/Input";

export const ChatBody:FC = () => {

  const activeMicHandler = () => {}

  return (
    <div className="flex justify-between items-center border border-gray-500 p-5 rounded-2xl w-[750px]">
      <Microphone onClick={activeMicHandler}/>
      <Input />
    </div>
  )
}
