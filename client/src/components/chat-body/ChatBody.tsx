/* eslint-disable react-hooks/exhaustive-deps */
import {
	useCallback,
	useEffect,
	useState,
	type ChangeEvent,
	type FC,
} from 'react'
import { chatMessagePostApi } from '../../api/chat.api'
import { useInput } from '../../hook/useInput'
import { useSpeechRecognition } from '../../hook/useSpeechRecognition'
import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Microphone } from '../../ui/Microphone'

export const ChatBody: FC = () => {
	const clientReqInput = useInput('')
	const [isActiveBtn, setIsActiveBtn] = useState(false)
	const [response, setResponse] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)

	const {
		isListening,
		transcript,
		startListening,
		stopListening,
		error: speechError,
		resetTranscript,
	} = useSpeechRecognition('ru-RU')

	useEffect(() => {
		if (transcript) {
			clientReqInput.onChange({
				target: { value: transcript },
			} as ChangeEvent<HTMLInputElement>)
		}
	}, [transcript, clientReqInput])

	useEffect(() => {
		if (speechError) {
			setError(speechError)
		}
	}, [speechError])

	const activeMicHandler = useCallback(() => {
		if (isListening) {
			stopListening()
			// Отправляем запрос, если есть текст
			if (clientReqInput.value) {
				setIsActiveBtn(true)
			}
		} else {
			resetTranscript()
			startListening()
		}
	}, [
		isListening,
		stopListening,
		startListening,
		resetTranscript,
		clientReqInput.value,
	])

	const fetchAnswer = useCallback(async () => {
		if (!clientReqInput.value) {
			setError('Введите сообщение или используйте микрофон')
			return
		}

		setError(null)
		setIsActiveBtn(true)

		try {
			const result = await chatMessagePostApi(clientReqInput.value)
			if (result) {
				setResponse(result)
			} else {
				setError('Не удалось получить ответ от сервера')
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Произошла ошибка')
		} finally {
			setIsActiveBtn(false)
		}
	}, [clientReqInput.value])

	const handleSendMessage = useCallback(() => {
		if (!isActiveBtn && clientReqInput.value) {
			fetchAnswer()
		}
	}, [isActiveBtn, fetchAnswer])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter' && !isActiveBtn && clientReqInput.value) {
				fetchAnswer()
			}
		},
		[isActiveBtn, fetchAnswer, clientReqInput.value]
	)

	return (
		<div className='flex flex-col gap-4 p-5 border border-gray-500 rounded-2xl w-[750px]'>
			{/* Отображение ответа и ошибок */}
			{response && (
				<div className='p-3 bg-gray-800 text-white rounded-lg'>
					<p>{response}</p>
				</div>
			)}
			{error && (
				<div className='p-3 bg-red-100 text-red-700 rounded-lg'>
					<p>{error}</p>
				</div>
			)}
			<div className='flex justify-between items-center gap-3'>
				<Microphone onClick={activeMicHandler} isActive={isListening} />
				<Input
					{...clientReqInput}
					onKeyDown={handleKeyDown}
					disabled={isListening || isActiveBtn}
				/>
				<Button
					onClick={handleSendMessage}
					isDisabled={isActiveBtn || isListening || !clientReqInput.value}
				/>
			</div>
		</div>
	)
}
