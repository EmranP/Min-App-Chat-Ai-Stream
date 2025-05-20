import type { FC } from 'react'
import { ChatTop } from './components/chat-top/ChatTop'
import { ChatBody } from './components/chat-body/ChatBody'
import { Wrapper } from './ui/Wrapper'

export const App: FC = () => {
	return (
		<Wrapper>
			<ChatTop />
			<ChatBody />
		</Wrapper>
	)
}
