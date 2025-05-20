import { fetch } from 'undici'
import { BASE_URL_AI_SERVICE } from '../constants/api.constant'

export const fetchApiChatGPT = async (message: string) =>
	await fetch(BASE_URL_AI_SERVICE, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
			'Content-Type': 'application/json',
			'HTTP-Referer': process.env.CLIENT_URL,
			'X-Title': 'Web-reactor',
		},
		body: JSON.stringify({
			model: 'openai/gpt-3.5-turbo',
			messages: [{ role: 'user', content: message }],
			stream: true,
		}),
	})
