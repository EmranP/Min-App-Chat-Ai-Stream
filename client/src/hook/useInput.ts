import { useState, type ChangeEvent } from "react"

export interface IHookInput {
  value: string
  onChange: (e:ChangeEvent<HTMLInputElement>) => void
}

export const useInput = (initValue: string = ''): IHookInput => {
  const [value, setValue] = useState(initValue)

  const onChange = (e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  return {value, onChange}
}
