import type { RequestHandler } from 'express'
import { chatWithGPTStream } from '../service/chat.service'

export const chatController: RequestHandler = async (
	req,
	res,
	next
): Promise<void> => {
	try {
		const message = req.body.message as string
		if (!message) res.status(404).json({ message: 'Error not found' })
		await chatWithGPTStream(message, res)
	} catch (error) {
		next(error)
	}
}
