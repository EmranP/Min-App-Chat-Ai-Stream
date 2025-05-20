import type { Response } from 'express'
import { fetchApiChatGPT } from '../api/chat.api'

export const chatWithGPTStream = async (message: string, res: Response) => {
	const response = await fetchApiChatGPT(message)
	res.setHeader('Content-Type', 'text/event-stream')
	res.setHeader('Cache-Control', 'no-cache')
	res.setHeader('Connection', 'keep-alive')

	if (!response.ok) {
		const errorText = await response.text()
		console.error('[OpenAI Error]', errorText)
		res.status(response.status).json({ error: JSON.parse(errorText) })
		return
	}

	const reader = (
		response.body as unknown as ReadableStream<Uint8Array>
	)?.getReader()
	const decoder = new TextDecoder()

	while (true) {
		const { done, value } = await reader!.read()

		if (done) break

		const chunk = decoder.decode(value, { stream: true })
		const lines = chunk.split('\n').filter(line => line.trim() !== '')

		for (const line of lines) {
			if (line.startsWith('data: ')) {
				const data = line.replace(/^data: /, '')
				if (data === '[DONE]') {
					res.write('event: done\ndata: done\n\n')
					res.end()
					return
				}

				const json = JSON.parse(data)
				const content = json.choices?.[0]?.delta?.content
				if (content) {
					res.write(`data: ${content}\n\n`)
				}
			}
		}
	}
}
