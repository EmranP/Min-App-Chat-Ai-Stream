import { Mic } from "lucide-react";
import type { FC } from "react";

type MicrophonePropsType = {
  onClick: () => void
}

export const Microphone:FC<MicrophonePropsType> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <Mic opacity={0.5} cursor={'pointer'}/>
    </div>
  )
}
