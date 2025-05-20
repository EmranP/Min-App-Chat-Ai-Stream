import { MessageCircle } from "lucide-react"
import type { FC } from "react"

export const Logo:FC = () => {
  return (
    <div className="bg-[#1D4C9B] p-3 rounded-3xl w-[60px] flex justify-center mb-10">
      <MessageCircle color="white" size={25}/>
    </div>
  )
}
