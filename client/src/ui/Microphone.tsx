import { Mic } from 'lucide-react'
import type { FC } from 'react'

type IMicrophoneProps = {
	onClick: () => void
	isActive: boolean
}

export const Microphone: FC<IMicrophoneProps> = ({ onClick, isActive }) => {
	return (
		<button
			className={`p-2 rounded-2xl border border-[#d1d5dc] ${
				isActive ? 'bg-blue-500 border-blue-700' : ''
			}`}
			onClick={onClick}
		>
			<Mic color={isActive ? '#ffffff' : '#d1d5dc'} />
		</button>
	)
}
