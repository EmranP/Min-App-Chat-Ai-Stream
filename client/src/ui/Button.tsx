import { ArrowUp } from 'lucide-react'
import type { FC } from 'react'

interface IButton {
	onClick: () => void
	isDisabled: boolean
}

export const Button: FC<IButton> = ({ onClick, isDisabled }) => {
	return (
		<button
			className={`cursor-pointer p-2 rounded-2xl border border-[#d1d5dc] ${
				isDisabled ? 'opacity-40' : ''
			}`}
			onClick={onClick}
			disabled={isDisabled}
		>
			<ArrowUp color='#d1d5dc' />
		</button>
	)
}
