import type { ChangeEvent, FC, KeyboardEvent } from 'react'

interface IInput {
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
	disabled?: boolean
}

export const Input: FC<IInput> = ({ value, onChange, onKeyDown, disabled }) => {
	return (
		<input
			className={`outline-none text-gray-300 font-semibold text-2xl flex-1 ${
				disabled ? 'opacity-50 cursor-not-allowed' : ''
			}`}
			placeholder='Ask whatever you want'
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			disabled={disabled}
		/>
	)
}
