import type { FC } from "react";
import { Logo } from "../../ui/Logo";
import { Title } from "../../ui/Title";

export const ChatTop :FC = () => {
  return (
    <div className="mb-40">
      <Logo />
      <Title
        title="Hi there!"
        subTitle="What would you like to know?"
        text="Use one of the most common prompts below or ask your own question"
      />
    </div>
  )
}
