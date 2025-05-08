import type { NextFunction, Request, Response } from 'express'
import { ApiError } from '../utils/exists-error.util'
import logger from '../utils/logger.util'

export const errorMiddleware: (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction
) => void = (err, req, res, next) => {
	logger.error(`[ERROR]: ${err instanceof Error ? err.message : err}`)

	if (err instanceof ApiError) {
		res
			.status(err.status)
			.json({ message: err.message, errors: err.errors || [] })
		return
	}

	res.status(500).json({ message: 'Непредвиденная ошибка' })
	return
}
