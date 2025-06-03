import { useCallback, useEffect, useRef, useState } from 'react'
import {
	SpeechRecognition,
	type SpeechRecognitionErrorEvent,
	type SpeechRecognitionEvent,
} from '../global/types/types'

interface ISpeechRecognitionHook {
	isListening: boolean
	transcript: string
	startListening: () => void
	stopListening: () => void
	toggleListening: () => void
	resetTranscript: () => void
	error: string | null
}

export const useSpeechRecognition = (
	lang: string = 'ru-RU'
): ISpeechRecognitionHook => {
	const [isListening, setIsListening] = useState(false)
	const [transcript, setTranscript] = useState('')
	const [error, setError] = useState<string | null>(null)
	const recognitionRef = useRef<SpeechRecognition | null>(null)

	useEffect(() => {
		// 6. Проверка поддержки API в браузере
		if (!SpeechRecognition) {
			setError('Ваш браузер не поддерживает Speech Recognition API.')
			return
		}

		// 7. Создаем экземпляр SpeechRecognition
		const recognition = new SpeechRecognition()
		recognitionRef.current = recognition

		recognition.continuous = false // Слушаем одно предложение
		recognition.interimResults = false // Без промежуточных результатов
		recognition.lang = lang // Устанавливаем язык

		recognition.onstart = () => {
			setIsListening(true)
			setTranscript('') // Очищаем текст при начале
			setError(null)
		}

		recognition.onresult = (event: SpeechRecognitionEvent) => {
			const currentTranscript = event.results[0][0].transcript
			setTranscript(currentTranscript)
		}

		recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
			setError(`Ошибка распознавания речи: ${event.error} - ${event.message}`)
			setIsListening(false)
		}

		recognition.onend = () => {
			setIsListening(false)
		}

		// 8. Очистка при размонтировании
		return () => {
			recognition.stop()
			recognitionRef.current = null
		}
	}, [lang]) // Зависимость только от lang

	// 9. Оптимизированные колбэки
	const startListening = useCallback(() => {
		if (recognitionRef.current && !isListening) {
			setError(null)
			try {
				recognitionRef.current.start()
			} catch (e: unknown) {
				if (e instanceof Error) {
					if (e.message.includes('recognition has already started')) {
						console.warn('Speech recognition is already active.')
					} else {
						setError(`Не удалось начать распознавание: ${e.message}`)
					}
				} else {
					setError('Неизвестная ошибка при запуске распознавания.')
				}
			}
		}
	}, [isListening])

	const stopListening = useCallback(() => {
		if (recognitionRef.current && isListening) {
			recognitionRef.current.stop()
		}
	}, [isListening])

	const toggleListening = useCallback(() => {
		if (isListening) {
			stopListening()
		} else {
			startListening()
		}
	}, [isListening, startListening, stopListening])

	const resetTranscript = useCallback(() => {
		setTranscript('')
	}, [])

	return {
		isListening,
		transcript,
		startListening,
		stopListening,
		toggleListening,
		resetTranscript,
		error,
	}
}
