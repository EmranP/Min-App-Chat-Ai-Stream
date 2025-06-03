export const BASE_URL = import.meta.env.VITE_BASE_API_URL

export const chatMessagePostApi = async (
	message: string
): Promise<string | undefined> => {
	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			credentials: 'omit',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message,
			}),
		})

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || 'Ошибка сервера')
		}

		const data: { response: string } = await response.json()
		return data.response
	} catch (error) {
		console.error(
			error instanceof Error ? error.message : 'Something went wrong'
		)
		return undefined
	}
}
