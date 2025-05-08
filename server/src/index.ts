import dotenv from 'dotenv'
import express from 'express'
import { appMiddleware } from './middleware/appMiddleware'
import { errorMiddleware } from './middleware/errorMiddleware'
import routerApp from './routes/router.route'
import logger from './utils/logger.util'

dotenv.config()

const app = express()
const port = process.env.PORT

appMiddleware(app, express)

app.use('/api', routerApp)

app.use(errorMiddleware)

const startApp = async (): Promise<void> => {
	try {
		app.listen(port, () => {
			logger.info(`🚀 Сервер запущен на http://localhost:${port}`)
		})
	} catch (error) {
		logger.error(`❌ Ошибка запуска сервера: ${error}`)
		process.exit(1)
	}
}

startApp()
