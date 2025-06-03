export interface SpeechRecognitionResult {
	transcript: string
	confidence: number
}

export interface SpeechRecognitionResultList {
	[index: number]: SpeechRecognitionResult
}

export interface SpeechRecognitionEvent extends Event {
	resultIndex: number
	results: SpeechRecognitionResultList[]
}

export interface SpeechRecognitionErrorEvent extends Event {
	error: string
	message: string
}

export type SpeechRecognition =
	| typeof window.SpeechRecognition
	| typeof window.webkitSpeechRecognition

export interface SpeechRecognitionInstance {
	lang: string
	continuous: boolean
	interimResults: boolean
	start: () => void
	stop: () => void
	onstart: (() => void) | null
	onresult: ((event: SpeechRecognitionEvent) => void) | null
	onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
	onend: (() => void) | null
}

// 3. Глобальная типизация для конструктора SpeechRecognition
declare global {
	interface Window {
		SpeechRecognition: new () => SpeechRecognitionInstance
		webkitSpeechRecognition: new () => SpeechRecognitionInstance
	}
}

// 5. Получение объекта SpeechRecognition
export const SpeechRecognition =
	typeof window !== 'undefined'
		? window.SpeechRecognition || window.webkitSpeechRecognition
		: undefined
