import compression from 'compression'
import cors from 'cors'
import express, { type Express } from 'express'
import helmet from 'helmet'

export const appMiddleware = (
	app: Express,
	expressInstance: typeof express
): void => {
	// 🔒 Включаем защиту через helmet
	app.use(helmet())

	app.use(expressInstance.json())

	app.use(
		cors({
			credentials: true,
			origin: process.env.CLIENT_URL,
		})
	)

	app.use(
		expressInstance.urlencoded({
			extended: true,
		})
	)

	// 💪 Производительности
	app.use(compression())
}
